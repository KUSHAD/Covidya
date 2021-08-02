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
	IonAlert,
	IonCard,
	IonText,
	IonCardContent,
	IonAvatar,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";
import NewBlog from "../Components/NewBlog";
import { database } from "../firebase";
import { useHistory } from "react-router-dom";
export default function Blogs() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [stories, setStories] = React.useState([]);
	const [error, setError] = React.useState("");
	const history = useHistory();
	React.useEffect(() => {
		const fetchStories = async () => {
			let docs = [];
			database.blogs
				.orderBy("timesStamp")
				.get()
				.then((snaps) => {
					snaps.docs.forEach((doc) => {
						const { id } = doc;
						const document = {
							...doc.data(),
							id,
						};
						docs.push(document);
					});
					setStories(docs);
				})
				.catch((err) => {
					setError(err.message);
				});
		};
		fetchStories();
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Covid Stories</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{stories.map((story) => (
					<IonCard
						onClick={() => history.push(`/blog/${story.id}`)}
						key={story.id}>
						<IonCardContent>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}>
								<IonAvatar>
									<img src={story.avatar} alt={story.avatar} />
								</IonAvatar>
								<IonText>
									{story.title.length < 35
										? story.title
										: story.title.slice(0, 35) + " ....."}
								</IonText>
							</div>
						</IonCardContent>
					</IonCard>
				))}
				<NewBlog onClose={() => setIsOpen(false)} isOpen={isOpen} />
				<IonAlert
					isOpen={error ? true : false}
					header='There was an error'
					message={error}
					duration={3000}
					buttons={[{ text: "Close", handler: () => setError("") }]}
				/>
			</IonContent>
			<IonFab vertical='bottom' horizontal='end'>
				<IonFabButton onClick={() => setIsOpen(true)}>
					<IonIcon icon={createOutline} />
				</IonFabButton>
			</IonFab>
		</IonPage>
	);
}
