import { useAtom } from 'jotai'
import {authUser_firestore} from "../state/auth-user.state";

export const useUser = () => {
	const [user] = useAtom(authUser_firestore);

	return {
		isLoggedIn: user?.uid,
		user
	}
}
