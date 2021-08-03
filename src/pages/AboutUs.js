import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonFooter,
	IonText,
} from "@ionic/react";
export default function AboutUs() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>About Us</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<iframe
					frameBorder={0}
					style={{
						height: "100vh",
						width: "100vw",
					}}
					src='https://rachitcoderai.github.io/About-Us-/aboutus.html'
					title='aboutus-html'
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
