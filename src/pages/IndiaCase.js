import React from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonAlert,
	IonText,
	IonCard,
	IonCardHeader,
	IonButton,
	IonCardContent,
	IonCardSubtitle,
	IonFooter,
} from "@ionic/react";
import axios from "axios";
import { Doughnut, Line } from "react-chartjs-2";
export default function IndiaCase() {
	const [data, setData] = React.useState();
	const [global, setGlobal] = React.useState();
	const [error, setError] = React.useState("");
	const [newCase, setNewCase] = React.useState();
	const [dates, setDates] = React.useState([]);
	const [newDeaths, setNewDeaths] = React.useState();
	React.useEffect(() => {
		const fetchDataIndiaData = async () => {
			try {
				const res = await axios.get(
					"https://covid19.mathdro.id/api/countries/India"
				);
				setData(res.data);
			} catch (error) {
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		const fetchGlobalData = async () => {
			try {
				const res = await axios.get("https://covid19.mathdro.id/api/");
				setGlobal(res.data);
			} catch (error) {
				console.log(error);
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		const fetchTrending = async () => {
			try {
				const res = await axios.get(
					`https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/IND`,
					{
						headers: {
							"x-rapidapi-key":
								"841cfa35bdmsh5d26323217559eap1ac156jsn9a65de2acda3",
							"x-rapidapi-host":
								"vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
						},
					}
				);
				const arranged = res.data.sort((a, b) => {
					if (a.date < b.date) {
						return 1;
					}
					if (a.date > b.date) {
						return -1;
					}
					return 0;
				});
				setNewCase(arranged.map((data) => data.new_cases));
				setNewDeaths(arranged.map((data) => data.new_deaths));
				setDates(
					arranged.map((data) => new Date(data.date).toLocaleDateString())
				);
			} catch (error) {
				setError(
					`There was some problem displaying the latest data. ${error.response.data.message}`
				);
			}
		};
		fetchDataIndiaData();
		fetchGlobalData();
		fetchTrending();
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Total Covid-19 Cases</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonTitle
					style={{
						textAlign: "center",
					}}>
					Covid Cases Globally
				</IonTitle>
				<Doughnut
					data={{
						labels: ["Active", "Recovered", "Deaths"],
						datasets: [
							{
								label: "People",
								backgroundColor: [
									"rgba(0, 0, 255, 0.5)",
									"rgba(0, 255, 0, 0.5)",
									"rgba(255, 0, 0, 0.5)",
								],
								data: [
									global?.confirmed.value,
									global?.recovered.value,
									global?.deaths.value,
								],
							},
						],
					}}
					options={{
						legend: { display: true },
						title: { display: true, text: `Current state globally` },
					}}
				/>
				<div
					style={{
						textAlign: "center",
					}}>
					<IonText>
						Last updated At :- {new Date(global?.lastUpdate).toLocaleString()}
					</IonText>
				</div>
				<br />
				<IonTitle
					style={{
						textAlign: "center",
					}}>
					Covid Cases In India
				</IonTitle>
				<Doughnut
					data={{
						labels: ["Active", "Recovered", "Deaths"],
						datasets: [
							{
								label: "People",
								backgroundColor: [
									"rgb(0,0,128)",
									"rgba(96, 31, 162, 0.7)",
									"rgba(219, 43, 0, 0.7)",
								],
								data: [
									data?.confirmed.value,
									data?.recovered.value,
									data?.deaths.value,
								],
							},
						],
					}}
					options={{
						legend: { display: true },
						title: { display: true, text: `Current state in India` },
					}}
				/>
				<div
					style={{
						textAlign: "center",
					}}>
					<IonText>
						Last updated At :- {new Date(data?.lastUpdate).toLocaleString()}
					</IonText>
				</div>
				<br />
				<IonTitle
					style={{
						textAlign: "center",
					}}>
					Covid Trends
				</IonTitle>
				<Line
					data={{
						labels: dates,
						datasets: [
							{
								label: "Cases",
								backgroundColor: ["rgba(0, 0, 255, 0.5)"],
								data: newCase,
							},
							{
								label: "Deaths",
								backgroundColor: ["rgba(0, 255, 0, 0.5)"],
								data: newDeaths,
							},
						],
					}}
				/>
				<IonCard>
					<IonCardHeader>
						<IonTitle>Covid-19 Precautions</IonTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonCardSubtitle>
							As you all know Covid-19 is a very dangerous virus, and hence to
							protect yourself from the deadly virus, you need to follow some
							necessary precautions. You can click the button below to see the
							precautions necessary to take during this pandemic.
						</IonCardSubtitle>
						<IonButton
							href='/precautions'
							rel='noreferer'
							style={{
								width: "100%",
							}}>
							Read More
						</IonButton>
					</IonCardContent>
				</IonCard>
				<IonAlert
					isOpen={error ? true : false}
					buttons={[
						{
							text: "Close",
							handler: () => setError(""),
						},
					]}
					header='There was an error'
					message={error}
					duration={3000}
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
