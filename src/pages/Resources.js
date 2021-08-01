import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonFooter,
	IonText,
} from "@ionic/react";
export default function Resources() {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Covid Services (West Bengal)</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<iframe
					frameBorder={0}
					style={{
						height: "100%",
						maxHeight: "100vh",
						width: "100vw",
					}}
					src='https://excise.wb.gov.in/CHMS/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx'
					title='Covid-Resources'
				/>
			</IonContent>
			<IonFooter>
				<IonText>
					<div
						style={{
							textAlign: "center",
						}}>
						This information has been taken by the Government of West Bengal's
						official website. Website link :-{" "}
						<a
							href='https://excise.wb.gov.in/CHMS/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx'
							target='_blank'
							rel='noreferrer'>
							https://excise.wb.gov.in/CHMS/Public/Page/CHMS_Public_Hospital_Bed_Availability.aspx
						</a>
						<br />
						Copyright &copy; 2021 Covidya
					</div>
				</IonText>
			</IonFooter>
		</IonPage>
	);
}
