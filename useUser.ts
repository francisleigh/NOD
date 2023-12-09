import { atom, useAtom, Atom } from 'jotai'

const userFirestoreAtom = atom<UserFirestore>({})
const userAtom = atom<UserClient>((get) => {
	const u = get(userFirestoreAtom);
	return {
		...u,
		firstName: u?.displayName?.split(' ')[0] ?? '',
		lastName: u?.displayName?.split(' ')[1] ?? '',
	}
});
const isLoggedInAtom = atom<boolean>((get) => {
	return !!get(userFirestoreAtom)?.uid
});

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {UserClient, UserFirestore} from "./types";
import {useEffect} from "react";
import {firebaseAuth} from "./firebase.config";

export const useUser = () => {
	const [, setUser] = useAtom(userFirestoreAtom);
	const [isLoggedIn] = useAtom(isLoggedInAtom);
	const [user] = useAtom(userAtom);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				setUser(user);
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, [])


	console.log('isLoggedIn', isLoggedIn);
	console.log('user', user);
	return {
		isLoggedIn,
		user
	}
}
