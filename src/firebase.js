import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyBjv6h6bigByx5jxj6DB9QnDRwBHe500z8",
	authDomain: "only-hosting-sites.firebaseapp.com",
	projectId: "only-hosting-sites",
	storageBucket: "only-hosting-sites.appspot.com",
	messagingSenderId: "978433046630",
	appId: "1:978433046630:web:c792beb647bc610aff95a7",
	measurementId: "G-0T7FJBNMJH",
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;

export const database = {
	blogs: firebase.firestore().collection("blogs"),
	timesStamp: firebase.firestore.FieldValue.serverTimestamp,
};

firebaseAuth().useDeviceLanguage();
