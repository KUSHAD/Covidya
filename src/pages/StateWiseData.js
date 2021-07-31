import React from "react";
import {
	IonPage,
	IonTitle,
	IonHeader,
	IonToolbar,
	IonContent,
	IonToast,
	IonSelect,
	IonSelectOption,
	IonLabel,
	IonItem,
	IonText,
} from "@ionic/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
export default function StateWiseData() {
	const [selectedState, setSelectedState] = React.useState("");
	const [states, setStates] = React.useState([]);
	const [error, setError] = React.useState("");
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"https://covid19.mathdro.id/api/countries/India/confirmed"
				);
				setStates(res.data);
				navigator.geolocation.getCurrentPosition(show_map);
				async function show_map(position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					const res = await axios.get(
						`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=746c54daeb3442d092fd558808cec723`
					);
					setSelectedState(res.data.results[0].components.state);
				}
			} catch (error) {
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		fetchData();
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>State Wise Data</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel>State</IonLabel>
					<IonSelect
						value={selectedState}
						onIonChange={(e) => setSelectedState(e.target.value)}>
						{states
							.sort((a, b) => a.provinceState.localeCompare(b.provinceState))
							.map((state) => (
								<IonSelectOption key={state.uid} value={state.provinceState}>
									{state.provinceState}
								</IonSelectOption>
							))}
					</IonSelect>
				</IonItem>
				<IonTitle
					style={{
						textAlign: "center",
					}}>
					Total Covid Cases in {selectedState}
				</IonTitle>
				{states
					.filter((state) => state.provinceState === selectedState)
					.map((state) => (
						<div key={state.uid}>
							<Doughnut
								data={{
									labels: ["Active", "Recovered", "Deaths"],
									datasets: [
										{
											label: "People",
											backgroundColor: [
												"rgba(0, 0, 255, 0.5)",
												"rgba(0, 255, 0, 0.5)",
												"rgba(255, 0, 0, 0.5)",
											],
											data: [state.confirmed, state.recovered, state.deaths],
										},
									],
								}}
								options={{
									legend: { display: true },
									title: {
										display: true,
										text: `Total Covid Cases in ${selectedState}`,
									},
								}}
							/>
							<div style={{ textAlign: "center" }}>
								<IonText>
									Last Updated At :-{" "}
									{new Date(state.lastUpdate).toLocaleString()}
								</IonText>
							</div>
						</div>
					))}
			</IonContent>
			<IonToast isOpen={error} message={error} duration={3000} />
		</IonPage>
	);
}
