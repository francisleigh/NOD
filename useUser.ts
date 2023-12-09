import { atom, useAtom } from 'jotai'
import {UserClient, UserFirestore} from "./types";
import {useEffect} from "react";
import {firebaseAuth} from "./firebase.config";

const userFirestoreAtom = atom<UserFirestore>({})
const userAtom = atom<UserClient>((get) => {
	const u = get(userFirestoreAtom);
	return {
		...(u ?? {}),
		firstName: u?.displayName?.split(' ')[0] ?? '',
		lastName: u?.displayName?.split(' ')[1] ?? '',
	}
});
const isLoggedInAtom = atom<boolean>((get) => {
	return !!get(userFirestoreAtom)?.uid
});

export const useUser = () => {
	const [, setUser] = useAtom(userFirestoreAtom);
	const [isLoggedIn] = useAtom(isLoggedInAtom);
	const [user] = useAtom(userAtom);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, [])


	console.log('isLoggedIn', isLoggedIn);
	console.log('user', user);
	return {
		isLoggedIn,
		user
	}
}
