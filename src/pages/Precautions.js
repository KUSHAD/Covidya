import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
export default function Precautions() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton slot='start' href='/' fill='clear'>
						<IonBackButton icon={chevronBack} text='Back' defaultHref='/' />
					</IonButton>
					<IonTitle>Covid-19 precautions</IonTitle>
				</IonToolbar>
			</IonHeader>
			<iframe
				frameBorder={0}
				style={{
					height: "100vh",
					width: "100vw",
				}}
				src='https://rachitcoderai.github.io/precautionsCovid/precaution.html'
				title='precations-html'
			/>
		</IonPage>
	);
}
