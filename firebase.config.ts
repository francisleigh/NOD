// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {Platform} from "react-native";

import firebase from '@react-native-firebase/app'
import firebaseAuth from '@react-native-firebase/auth'
import firebaseFirestore from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const appId = Platform.select({
	ios: "1:742031503738:ios:e55f86ec67c563366926c3",
	android: "1:742031503738:android:4b77a6982fac85ba6926c3",
	web: "1:742031503738:web:7e8c7a58e54cd6526926c3"
})

const firebaseConfig = {
	appId,
	apiKey: "AIzaSyAbKdsnuZ6V8aw_N2X8J9isZVNZZz_qfBc",
	authDomain: "nod-7d365.firebaseapp.com",
	projectId: "nod-7d365",
	storageBucket: "nod-7d365.appspot.com",
	messagingSenderId: "742031503738",
	measurementId: "G-Q52584R21R"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseDb = firebaseFirestore;
