import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonCard,
	IonCardTitle,
	IonCardContent,
	IonText,
	IonCardHeader,
	IonFooter,
	IonIcon,
} from "@ionic/react";
import { O2_Vendors } from "../utils/vendors";
import { call } from "ionicons/icons";

export default function O2() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>O2 Vendors</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{O2_Vendors.map((vender) => (
					<IonCard key={vender.si}>
						<IonCardHeader>
							<IonCardTitle>{vender.NAME}</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<IonText>{vender.LOCATION}</IonText>
							<br />
							<IonText>Type :- {vender.TYPE}</IonText>
							<br />
							<IonButton href={`tel:${vender.ph_no}`}>
								<IonIcon icon={call} />
								Call Vendor
							</IonButton>
						</IonCardContent>
					</IonCard>
				))}
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
