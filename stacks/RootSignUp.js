import React from 'react';
import DeliveryInfo from "../components/screens/onboardingScreens/DeliveryInfo";
import WelcomeScreen2 from "../components/screens/onboardingScreens/WelcomeScreen2";
import FlavourProfile from "../components/screens/onboardingScreens/flavourProfile/FlavourProfile";
import RootSignIn from './RootSignIn'
import { createStackNavigator } from "@react-navigation/stack";
import {
    StyleSheet,
    Dimensions,
  } from "react-native";

const Stack = createStackNavigator();

const RootSignUp = () => {
    return (
        <Stack.Navigator style={styles.container}>
          <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
          <Stack.Screen name="FlavourProfile" component={FlavourProfile} />
          <Stack.Screen name="DeliveryInfo1" component={DeliveryInfo} />
          <Stack.Screen name="RootSignIn" component={RootSignIn} />
        </Stack.Navigator>
      );
}

export default RootSignUp;

const styles = StyleSheet.create({
    container: {
      maxWidth: Dimensions.get("window").width,
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
  });