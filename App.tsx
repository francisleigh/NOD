import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import {
  TamaguiProvider,
  Square,
  H2,
  Circle,
  Card,
  XStack,
  YStack,
  XGroup,
  Button,
  ZStack,
  ScrollView,
  H1,
} from "tamagui";
import { Plus, SendToBack, Bell } from "@tamagui/lucide-icons";

import config from "./tamagui.config";
import {useUser} from "./useUser";
import {firebaseApp, firebaseAuth} from "./firebase.config";

export default function App() {
  const {isLoggedIn, user} = useUser();

  return (
    <TamaguiProvider config={config}>

      <SafeAreaView
        style={{
          position: "relative",
          borderWidth: 1,
          borderColor: "black",
          height: "100%",
          width: "100%",
          gap: 10,
        }}
      >
        {isLoggedIn ?<>
          <YStack
              w={"100%"}
              flex={0.5}
              alignItems={"center"}
              padding="$3"
              alignSelf="center"
              space={"$3"}
          >
            <H1>NODS</H1>
            <XStack
                flex={1}
                w={"100%"}
                space="$3"
                borderWidth={2}
                borderColor="$color"
                borderRadius="$4"
                padding="$3"
            >
              <YStack flex={1} borderWidth={2} borderColor="$color" />
              <YStack flex={1} borderWidth={2} borderColor="$color" />
              <YStack flex={1} borderWidth={2} borderColor="$color" />
            </XStack>

            <XStack
                flex={1}
                w={"100%"}
                space="$3"
                borderWidth={2}
                borderColor="$color"
                borderRadius="$4"
                padding="$3"
            >
              <YStack flex={1} borderWidth={2} borderColor="$color" />
              <YStack flex={0.5} borderWidth={2} borderColor="$color" />
            </XStack>

            <XStack
                flex={1}
                w={"100%"}
                space="$3"
                borderWidth={2}
                borderColor="$color"
                borderRadius="$4"
                padding="$3"
            >
              <YStack flex={0.5} borderWidth={2} borderColor="$color" />
              <YStack flex={1} borderWidth={2} borderColor="$color" />
            </XStack>
          </YStack>

          <YStack
              w={"100%"}
              flex={0.5}
              alignItems={"center"}
              padding="$3"
              alignSelf="center"
              space={"$3"}
          >
            <H2>Friends</H2>
            <ScrollView w={"100%"}>
              <YStack space="$3">
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <YStack h={"$4"} flex={1} borderWidth={2} borderColor="$color" />
                <Square h={75} w={"100%"} />
              </YStack>
            </ScrollView>
          </YStack>
        </>  : <Auth />}

        {isLoggedIn ? <Controls /> : null}

      </SafeAreaView>

      <StatusBar style="auto" />
    </TamaguiProvider>
  );
}

const Controls = () => {
  return (
    <XGroup
      size="$6"
      gap={"$2"}
      position={"absolute"}
      alignSelf={"center"}
      bottom={50}
    >
      <XGroup.Item>
        <Button icon={<Plus size={"$2"} />} />
      </XGroup.Item>

      <XGroup.Item>
        <Button icon={Bell} />
      </XGroup.Item>

      <XGroup.Item>
        <Button icon={<SendToBack size={"$2"} />} />
      </XGroup.Item>
    </XGroup>
  );
};

const Auth = () => {
  const handleSignUp = () => {
    console.log('handleSignup')
  }

  const handleLogin = () => {
    console.log('handlelogin')
  }
  return <>
    <YStack
        w={"100%"}
        flex={0.5}
        alignItems={"center"}
        padding="$3"
        alignSelf="center"
        space={"$3"}
    >
      <Button onPress={handleLogin}>Log in</Button>
      <Button onPress={handleSignUp}>Sign up</Button>
    </YStack>
  </>
}
