import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import SignIn from "./components/Screens/SignIn/SignIn";
import SignUp from "./components/Screens/SignUp/SignUp";
import DeliveryInfo from "./components/Screens/OnboardingScreens/DeliveryInfo";
import Home from "./components/Screens/Home/Home";
import WelcomeScreen from "./components/Screens/WelcomeScreen/WelcomeScreen";
import WelcomeScreen2 from "./components/Screens/OnboardingScreens/WelcomeScreen2";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import AllergyOptions from "./components/Screens/OnboardingScreens/FlavourProfile/AllergyOptions";

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator style={styles.container} initialRouteName="Home">
       


          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="DeliveryInfo" component={DeliveryInfo} />
          <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen} />
          <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />

      </Stack.Navigator>
      
    </NavigationContainer>
    // <AllergyOptions />
  )
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
