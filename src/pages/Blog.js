import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButton,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonAvatar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { chevronBack } from "ionicons/icons";
export default function Blog() {
	const [story, setStory] = React.useState();
	const { id } = useParams();
	React.useEffect(() => {
		database.blogs
			.doc(id)
			.get()
			.then((snap) => {
				setStory(snap.data());
			});
	}, [id]);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton slot='start' href='/blogs' fill='clear'>
						<IonBackButton
							icon={chevronBack}
							text='Back'
							defaultHref='/blogs'
						/>
					</IonButton>
					<IonTitle>{story?.title}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonCard>
					<IonCardHeader>
						<IonAvatar>
							<img src={story?.avatar} alt={story?.avatar} />
						</IonAvatar>
						<IonCardTitle>{story?.title}</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<div
							dangerouslySetInnerHTML={{
								__html: story?.content,
							}}
						/>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
}
