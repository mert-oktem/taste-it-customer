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
        <Stack.Navigator style={styles.container} initialRouteName="WelcomeScreen2" independent={true}>
          <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} options={{headerShown: false, title: ""}}/>
          <Stack.Screen name="FlavourProfile" component={FlavourProfile} options={{title: ""}}/>
          <Stack.Screen name="DeliveryInfo1" component={DeliveryInfo} options={{title: ""}}/>
          <Stack.Screen name="RootSignIn" component={RootSignIn} options={{headerShown: false, title: ""}}/>
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