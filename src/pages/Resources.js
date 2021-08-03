import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonList,
	IonItem,
	IonText,
	IonIcon,
	IonFooter,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { States } from "../utils/States";
import { useHistory } from "react-router-dom";
export default function Resources() {
	const history = useHistory();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Covid Hospitals</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					{States.map((state) => (
						<IonItem
							onClick={() => history.push(`/state/${state.text}`)}
							key={state.url}>
							<IonText>{state.text}</IonText>
							<IonIcon slot='end' icon={chevronForward} />
						</IonItem>
					))}
				</IonList>
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
