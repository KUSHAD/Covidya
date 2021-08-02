import React from "react";
import {
	IonPage,
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButton,
	IonIcon,
	IonContent,
	IonText,
	IonItem,
	IonLabel,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { close } from "ionicons/icons";
import { useAuthUser } from "../context/Auth";
import { countryCodes } from "../utils/countryCodes";
import { firebaseAuth, database } from "../firebase";
export default function Auth() {
	const history = useHistory();
	const { setUser, auth } = useAuthUser();
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [country, setCountry] = React.useState("");
	const [showCodeInput, setShowCodeInput] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [success, setSuccess] = React.useState("");
	const [error, setError] = React.useState("");
	const [OTP, setOTP] = React.useState("");
	function onClose() {
		setUser();
		history.push("/blogs");
	}
	React.useEffect(() => {
		window.appVerifier = new firebaseAuth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
			}
		);
	}, []);
	function sendOTP() {
		const fullNumber = `${country}${phoneNumber}`;
		const appVerifier = window.appVerifier;
		firebaseAuth()
			.signInWithPhoneNumber(fullNumber, appVerifier)
			.then((result) => {
				setIsSubmitting(true);
				setError("");
				window.confirmationResult = result;
				setSuccess("OTP sent in Your Message Succesfully");
				setShowCodeInput(true);
			})
			.catch((err) => {
				setError(err.message);
			});
		setIsSubmitting(false);
	}

	function verifyOTP() {
		setIsSubmitting(true);
		window.confirmationResult
			.confirm(OTP)
			.then(() => {
				setError("");
				console.log(`Verified`);
				setSuccess("OTP Verified");
				const uid = firebaseAuth().currentUser.uid;
				const time = database.timesStamp();
				database.blogs
					.add({
						...auth,
						user: uid,
						timesStamp: time,
					})
					.then(() => {
						setSuccess("Added Story Sucessfully");
						setUser();
						history.push("/blogs");
					})
					.catch((e) => setError(e.message));
			})
			.catch((err) => {
				setError(err.message);
			});
		setIsSubmitting(false);
	}
	return (
		<IonPage>
			<div id='recaptcha-container'></div>
			<IonModal isOpen backdropDismiss={false}>
				<IonHeader>
					<IonToolbar>
						<IonButton slot='start' onClick={onClose} fill='clear'>
							<IonIcon icon={close} /> Close
						</IonButton>
						<IonTitle>Authentication</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<div
						style={{
							textAlign: "center",
							padding: 12,
						}}>
						<IonText>
							You need to verify your mobile number before posting your covid
							story
						</IonText>
					</div>
					<IonItem>
						<IonLabel position='floating'>Country</IonLabel>
						<IonSelect
							disabled={showCodeInput}
							value={country}
							onIonChange={(e) => setCountry(e.target.value)}>
							{countryCodes.map((country) => (
								<IonSelectOption key={country.code} value={country.dial_code}>
									{country.name} {country.dial_code}
								</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Phone Number</IonLabel>
						<IonInput
							disabled={showCodeInput}
							value={phoneNumber}
							onIonChange={(e) => setPhoneNumber(e.target.value)}
							type='tel'
						/>
						{phoneNumber && phoneNumber.length !== 10 && (
							<small style={{ color: "#ff0000" }}>
								Phone Number Should Be 10 digits
							</small>
						)}
					</IonItem>
					{showCodeInput && (
						<IonItem>
							<IonLabel position='floating'>OTP Sent to your number</IonLabel>
							<IonInput
								value={OTP}
								onIonChange={(e) => setOTP(e.target.value)}
								type='tel'
							/>
							{OTP && OTP.length !== 6 && (
								<small style={{ color: "#ff0000" }}>
									OTP Should Be 6 digits
								</small>
							)}
						</IonItem>
					)}
					<div
						style={{
							padding: 12,
						}}>
						<IonButton
							onClick={() => (showCodeInput ? verifyOTP() : sendOTP())}
							disabled={
								isSubmitting || showCodeInput
									? !OTP || OTP.length !== 6
									: !phoneNumber || phoneNumber.length !== 10 || !country
							}
							style={{
								width: "100%",
							}}>
							{showCodeInput ? "Verify OTP" : "Send OTP"}
						</IonButton>
					</div>
					<div
						style={{
							textAlign: "center",
						}}>
						<IonText>
							By Tapping Send OTP,an SMS will be sent. Message and data rates
							may apply
						</IonText>
					</div>
				</IonContent>
				<IonAlert
					isOpen={error ? true : false}
					header='There was an error'
					message={error}
					duration={3000}
					buttons={[{ text: "Close", handler: () => setError("") }]}
				/>
				<IonAlert
					isOpen={success ? true : false}
					header='Success'
					message={success}
					duration={3000}
					buttons={[{ text: "Close", handler: () => setSuccess("") }]}
				/>
			</IonModal>
		</IonPage>
	);
}
