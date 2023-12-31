import {FirebaseAuthTypes} from "@react-native-firebase/auth";

type ToFirestore<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
type ToClient<T> = { id: string } & T;

type User = FirebaseAuthTypes.User

type Scenario = {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type ScenarioUser = {

} & User;

type ScenarioNod = {
  userUid: User['uid'];
  createdAt: Date;
  ttl: Date;
};

export type UserFirestore = ToFirestore<User>|null
export type ScenarioClient = ToClient<Scenario>;
export type ScenarioFirestore = ToFirestore<Scenario>;
