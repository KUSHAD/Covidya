import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButton,
	IonAlert,
	IonContent,
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardHeader,
	IonCardTitle,
	IonIcon,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonFooter,
	IonText,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { chevronBack, locate, call } from "ionicons/icons";
import { States } from "../utils/States";
import axios from "axios";
export default function SelectedStateHopitalData() {
	const { stateName } = useParams();
	const [url, setUrl] = React.useState();
	const [hospitals, setHospitals] = React.useState([]);
	const [error, setError] = React.useState("");
	const [search, setSearch] = React.useState("");
	React.useEffect(() => {
		const fetchData = async () => {
			const state = await States.filter((state) => state.text === stateName);
			await setUrl(state[0].url);
			try {
				const res = await axios.get(url);
				setHospitals(res.data);
			} catch (error) {
				console.log(error);
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		fetchData();
	}, [stateName, url]);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton slot='start' fill='clear'>
						<IonBackButton
							icon={chevronBack}
							text='Back'
							defaultHref='/resources'
						/>
					</IonButton>
					<IonTitle>{stateName}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{stateName !== "Goa" && (
					<IonItem>
						<IonLabel>Search by Districts</IonLabel>
						<IonSelect
							value={search}
							onIonChange={(e) => setSearch(e.target.value)}>
							<IonSelectOption value=''>
								{stateName === "Haryana"
									? "No City Selected"
									: "No District Selected"}
							</IonSelectOption>
							{hospitals
								.reduce((accumulator, current) => {
									if (stateName === "Haryana") {
										if (!accumulator.some((x) => x.CITY === current.CITY)) {
											accumulator.push(current);
										}
									} else {
										if (
											!accumulator.some((x) => x.DISTRICT === current.DISTRICT)
										) {
											accumulator.push(current);
										}
									}
									return accumulator;
								}, [])
								.sort((a, b) => {
									if (stateName === "Haryana") {
										return a.CITY.localeCompare(b.CITY);
									} else {
										return a.DISTRICT.localeCompare(b.DISTRICT);
									}
								})
								.map((hospital) => (
									<IonSelectOption key={hospital.UID}>
										{stateName === "Haryana"
											? hospital.CITY
											: hospital.DISTRICT}
									</IonSelectOption>
								))}
						</IonSelect>
					</IonItem>
				)}
				{hospitals
					.filter((hospital) => {
						if (stateName !== "Goa") {
							if (stateName === "Haryana") {
								return hospital?.CITY?.includes(search);
							} else {
								return hospital?.DISTRICT?.includes(search);
							}
						} else {
							return hospital;
						}
					})
					.map((hospital) => (
						<>
							<IonCard key={hospital.UID}>
								<IonCardHeader>
									<IonCardTitle>
										{stateName === "Bihar" || stateName === "Haryana"
											? hospital.FACILITY_NAME
											: hospital.HOSPITAL_NAME}
									</IonCardTitle>
									<IonCardSubtitle>
										{stateName === "Haryana"
											? hospital.CITY
											: hospital.DISTRICT}
									</IonCardSubtitle>
								</IonCardHeader>
								<IonCardContent>
									<IonButton
										href={
											stateName !== "Haryana" &&
											(stateName === "Uttarakhand" ||
												stateName === "Andhra Pradesh")
												? `tel:${hospital.NODAL_OFFICER_CONTACT}`
												: `tel:${hospital.CONTACT}`
										}>
										<IonIcon icon={call} />
										Call Hospital
									</IonButton>

									{stateName !== "Andhra Pradesh" && stateName !== "Haryana" ? (
										<IonButton href={hospital.LOCATION}>
											<IonIcon icon={locate} /> View Location
										</IonButton>
									) : null}
								</IonCardContent>
							</IonCard>
						</>
					))}

				<IonAlert
					isOpen={error ? true : false}
					buttons={[
						{
							text: "Close",
							handler: () => setError(""),
						},
					]}
					header='There was an error'
					message={error}
					duration={3000}
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
