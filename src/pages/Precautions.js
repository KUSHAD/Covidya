import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButton,
	IonContent,
	IonText,
	IonFooter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
export default function Precautions() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton slot='start' href='/cases' fill='clear'>
						<IonBackButton
							icon={chevronBack}
							text='Back'
							defaultHref='/cases'
						/>
					</IonButton>
					<IonTitle>Covid-19 precautions</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<iframe
					frameBorder={0}
					style={{
						height: "100vh",
						width: "100vw",
					}}
					src='https://rachitcoderai.github.io/precautionsCovid/precaution.html'
					title='precations-html'
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
