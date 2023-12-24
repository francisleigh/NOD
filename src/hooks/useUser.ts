import { atom, useAtom } from 'jotai'
import {authUser} from "../state/auth-user.state";

const isLoggedInAtom = atom<boolean>((get) => {
	return !!get(authUser)?.uid
});

export const useUser = () => {
	const [isLoggedIn] = useAtom(isLoggedInAtom);
	const [user] = useAtom(authUser);

	return {
		isLoggedIn,
		user
	}
}
