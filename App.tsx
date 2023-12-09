import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

import {useUser} from "./useUser";

export default function App() {
  const {isLoggedIn, user} = useUser();

  return (
      <>
        <SafeAreaView
          style={{
            position: "relative",
            borderWidth: 1,
            borderColor: "black",
            height: "100%",
            width: "100%",
            gap: 10,
            backgroundColor: 'tomato'
          }}
        >

        </SafeAreaView>

        <StatusBar style="auto" />
      </>
  );

