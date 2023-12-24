// Import the functions you need from the SDKs you need
import {Platform} from "react-native";
import firebase, {ReactNativeFirebase} from '@react-native-firebase/app'
import firebaseAuthentication, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import firebaseFirestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const baseConfig: { storageBucket: string; apiKey: string; messagingSenderId: string; projectId: string; measurementId: string; databaseURL: string; authDomain: string } = {
	apiKey: "AIzaSyAbKdsnuZ6V8aw_N2X8J9isZVNZZz_qfBc",
	authDomain: "nod-7d365.firebaseapp.com",
	projectId: "nod-7d365",
	storageBucket: "nod-7d365.appspot.com",
	messagingSenderId: "742031503738",
	measurementId: "G-Q52584R21R",
	databaseURL: '',
}

const iosAppId = "1:742031503738:ios:e55f86ec67c563366926c3"
const androidAppId = "1:742031503738:android:4b77a6982fac85ba6926c3"
const webAppId = "1:742031503738:web:7e8c7a58e54cd6526926c3"

export const firebaseOptionsConfigs: {[key in 'ios'|'android'|'web']: Pick<ReactNativeFirebase.FirebaseAppOptions, 'appId'>&typeof baseConfig} = {
	ios: {
		appId: iosAppId,
		...baseConfig
	},
	android: {
		appId: androidAppId,
		...baseConfig
	},
	web: {
		appId: webAppId,
		...baseConfig
	}
}

const firebaseConfig: ReactNativeFirebase.FirebaseAppOptions = Platform.select(firebaseOptionsConfigs);

let firebaseApp:ReactNativeFirebase.FirebaseApp|null = null
let firebaseAuth: FirebaseAuthTypes.Module | null = null;
let firebaseDb: FirebaseFirestoreTypes.Module | null = null;
export const getFirebase = () => {
	if (!firebaseAuth) firebaseAuth = firebaseAuthentication(firebaseApp);
	if (!firebaseDb) firebaseDb = firebaseFirestore(firebaseApp)
	return {
		firebaseApp,
		firebaseAuth,
		firebaseDb
	}
}

export const initialiseFirebase = async () => {
	if (firebase.apps.length === 0) {
		const app = await firebase.initializeApp( firebaseConfig);
		if (app) {
			firebaseApp = app;
		}
	}
}
