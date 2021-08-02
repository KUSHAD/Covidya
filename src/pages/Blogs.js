import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonFabButton,
	IonFab,
	IonIcon,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import NewBlog from "../Components/NewBlog";
export default function Blogs() {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Covid Stories</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonFab vertical='bottom' horizontal='end'>
					<IonFabButton onClick={() => setIsOpen(true)}>
						<IonIcon icon={createOutline} />
					</IonFabButton>
				</IonFab>
				<NewBlog onClose={() => setIsOpen(false)} isOpen={isOpen} />
			</IonContent>
		</IonPage>
	);
}
