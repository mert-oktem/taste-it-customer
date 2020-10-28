import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import SignIn from "./components/screens/signIn/SignIn";
import SignUp from "./components/screens/signUp/SignUp";
import DeliveryInfo from "./components/screens/onboardingScreens/DeliveryInfo";
import Home from "./components/screens/home/Home";
import WelcomeScreen from "./components/screens/welcomeScreen/WelcomeScreen";
import WelcomeScreen2 from "./components/screens/onboardingScreens/WelcomeScreen2";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllergyOptions from "./components/screens/onboardingScreens/flavourProfile/AllergyOptions";
import FlavourProfile from "./components/screens/onboardingScreens/flavourProfile/FlavourProfile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="DeliveryInfo1" component={DeliveryInfo} />
        <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen} />
        <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
        <Stack.Screen name="FlavourProfile" component={FlavourProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
