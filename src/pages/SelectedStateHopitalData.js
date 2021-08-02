import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButton,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { chevronBack } from "ionicons/icons";
export default function SelectedStateHopitalData() {
	const { stateName } = useParams();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton slot='start' fill='clear'>
						<IonBackButton
							icon={chevronBack}
							text='Back'
							defaultHref='/states'
						/>
					</IonButton>
					<IonTitle>{stateName}</IonTitle>
				</IonToolbar>
			</IonHeader>
		</IonPage>
	);
}
