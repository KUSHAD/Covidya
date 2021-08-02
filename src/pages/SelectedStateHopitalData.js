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
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { chevronBack, locate } from "ionicons/icons";
import { States } from "../utils/States";
import axios from "axios";
export default function SelectedStateHopitalData() {
	const { stateName } = useParams();
	const [url, setUrl] = React.useState();
	const [hospitals, setHospitals] = React.useState([]);
	const [error, setError] = React.useState("");

	React.useEffect(() => {
		const fetchData = async () => {
			const state = await States.filter((state) => state.text === stateName);
			await setUrl(state[0].url);
			try {
				const res = await axios.get(url);
				setHospitals(res.data);
			} catch (error) {
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
				{hospitals.map((hospital) => (
					<IonCard key={hospital.UID}>
						<IonCardHeader>
							<IonCardTitle>
								{stateName === "Bihar" || stateName === "Haryana"
									? hospital.FACILITY_NAME
									: hospital.HOSPITAL_NAME}
							</IonCardTitle>
							<IonCardSubtitle>
								{stateName === "Haryana" ? hospital.CITY : hospital.DISTRICT}
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
								Call Hospital
							</IonButton>

							{stateName !== "Andhra Pradesh" && stateName !== "Haryana" ? (
								<IonButton href={hospital.LOCATION}>
									<IonIcon icon={locate} /> View Location
								</IonButton>
							) : null}
						</IonCardContent>
					</IonCard>
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
			</IonContent>
		</IonPage>
	);
}
