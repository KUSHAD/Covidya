import React from "react";
import {
	IonPage,
	IonTitle,
	IonHeader,
	IonToolbar,
	IonContent,
	IonAlert,
	IonSelect,
	IonSelectOption,
	IonLabel,
	IonItem,
	IonText,
	IonFooter,
} from "@ionic/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
export default function StateWiseData() {
	const [selectedState, setSelectedState] = React.useState("");
	const [states, setStates] = React.useState([]);
	const [data, setData] = React.useState();
	const [error, setError] = React.useState("");
	const [allowed, setAllowed] = React.useState(false);
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					"https://covid19.mathdro.id/api/countries/India/confirmed"
				);
				setStates(res.data);
				navigator.geolocation.getCurrentPosition(show_map, error_func);
				async function show_map(position) {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					try {
						const res = await axios.get(
							`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=746c54daeb3442d092fd558808cec723`
						);
						setAllowed(true);
						setSelectedState(res.data.results[0].components.state);
					} catch (error) {
						setError(
							`There was some problem displaying the latest data. ${error.response.data.message}`
						);
					}
				}
				async function error_func(e) {
					try {
						setAllowed(false);
						setError(e.message);
						const res = await axios.get(
							"https://covid19.mathdro.id/api/countries/India"
						);
						setSelectedState("India");
						setData(res.data);
					} catch (err) {
						setError(
							`There was some problem displaying the latest data. ${error.response.data.message}`
						);
					}
				}
			} catch (error) {
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>State Wise Data</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{allowed ? (
					<>
						<IonItem>
							<IonLabel>State</IonLabel>
							<IonSelect
								value={selectedState}
								onIonChange={(e) => setSelectedState(e.target.value)}>
								{states
									.sort((a, b) =>
										a.provinceState.localeCompare(b.provinceState)
									)
									.map((state) => (
										<IonSelectOption
											key={state.uid}
											value={state.provinceState}>
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
													data: [
														state.confirmed,
														state.recovered,
														state.deaths,
													],
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
					</>
				) : (
					<>
						<IonText
							style={{
								textAlign: "center",
							}}>
							Total Covid Cases in {selectedState}(Please Grant Geolocation and
							refresh this page to see state wise data)
						</IonText>
						<Doughnut
							data={{
								labels: ["Active", "Recovered", "Deaths"],
								datasets: [
									{
										label: "People",
										backgroundColor: [
											"rgb(0,0,128)",
											"rgba(96, 31, 162, 0.7)",
											"rgba(219, 43, 0, 0.7)",
										],
										data: [
											data?.confirmed.value,
											data?.recovered.value,
											data?.deaths.value,
										],
									},
								],
							}}
							options={{
								legend: { display: true },
								title: { display: true, text: `Current state in India` },
							}}
						/>
						<div
							style={{
								textAlign: "center",
							}}>
							<IonText>
								Last updated At :- {new Date(data?.lastUpdate).toLocaleString()}
							</IonText>
						</div>
					</>
				)}
				<IonAlert
					isOpen={error ? true : false}
					header='There was an error'
					message={error}
					duration={3000}
					buttons={[{ text: "Close", handler: () => setError("") }]}
				/>
				<IonFooter>
					<div
						style={{
							textAlign: "center",
						}}>
						<IonText>© Copyright Covidya 2021</IonText>
					</div>
				</IonFooter>
			</IonContent>
		</IonPage>
	);
}
