import React from 'react';
import LoggedInGoogle from "../components/screens/signIn/LoggedInGoogle";
import RootSignUp from './RootSignUp'
import { createStackNavigator } from "@react-navigation/stack";
import {
    StyleSheet,
    Dimensions,
  } from "react-native";

const Stack = createStackNavigator();


const RootGoogle = () => {
    return (
        <Stack.Navigator style={styles.container} initialRouteName="LoggedInGoogle" independent={true}>
          <Stack.Screen name="LoggedInGoogle" component={LoggedInGoogle} options={{headerShown: false, title: ""}}/>
          <Stack.Screen name="RootSignUp" component={RootSignUp} options={{headerShown: false, title: ""}}/>
        </Stack.Navigator>
      );
}

export default RootGoogle;

const styles = StyleSheet.create({
    container: {
      maxWidth: Dimensions.get("window").width,
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
  });