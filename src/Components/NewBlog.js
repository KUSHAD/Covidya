import React from "react";
import ReactQuill from "react-quill";
import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { close } from "ionicons/icons";
import { useAuthUser } from "../context/Auth";
export default function NewBlog({ isOpen, onClose }) {
	const [content, setContent] = React.useState();
	const [title, setTitle] = React.useState("");
	const history = useHistory();
	const { setUser } = useAuthUser();
	function onClick() {
		setUser({ title, content });
		setTitle("");
		setContent("");
		onClose();
		history.push("/auth");
	}
	return (
		<IonModal swipeToClose isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar>
					<IonButton
						slot='start'
						onClick={() => {
							setTitle("");
							setContent("");
							onClose();
						}}
						fill='clear'>
						<IonIcon icon={close} /> Close
					</IonButton>
					<IonTitle>Create your New Covid Story</IonTitle>
					<IonButton
						onClick={onClick}
						fill='clear'
						slot='end'
						disabled={
							!title ||
							content === undefined ||
							content === "" ||
							content === "<p><br></p>"
								? true
								: false
						}>
						Save
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonItem>
					<IonLabel position='floating'>Story Title</IonLabel>
					<IonInput
						value={title}
						onIonChange={(e) => setTitle(e.target.value)}
					/>
				</IonItem>
				<ReactQuill
					style={{
						height: "100%",
					}}
					to
					theme='snow'
					placeholder='Write your Covid Story'
					modules={{
						toolbar: [
							[{ header: [1, 2, 3, 4, 5, 6, false] }],
							[{ font: [] }],
							[{ list: "ordered" }, { list: "bullet" }],
							["bold", "italic", "underline"],
							[{ color: [] }, { background: [] }],
							[{ script: "sub" }, { script: "super" }],
							[{ align: [] }],
							["image", "blockquote"],
							["clean", "link"],
						],
					}}
					value={content}
					onChange={setContent}
				/>
			</IonContent>
		</IonModal>
	);
}
