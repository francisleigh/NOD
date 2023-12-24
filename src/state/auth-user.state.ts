import {atom} from "jotai";
import {UserClient, UserFirestore} from "../../types";

export const authUser_firestore = atom<UserFirestore>({})
export const authUser = atom<UserClient>((get) => {
	const u = get(authUser_firestore);
	return {
		...(u ?? {}),
		firstName: u?.displayName?.split(' ')[0] ?? '',
		lastName: u?.displayName?.split(' ')[1] ?? '',
	}
});
