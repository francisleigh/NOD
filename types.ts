import firebase from "firebase/compat";
type ToFirestore<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
type ToClient<T> = { id: string } & T;

type User = firebase.User | null

type Scenario = {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

type ScenarioUser = {

} & User;

type ScenarioNod = {
  userId: User['id'];
  createdAt: Date;
  ttl: Date;
};

export type UserClient = ToClient<User & {
  firstName: string | undefined;
  lastName: string | undefined;
}>
export type UserFirestore = ToFirestore<User>
export type ScenarioClient = ToClient<Scenario>;
export type ScenarioFirestore = ToFirestore<Scenario>;
