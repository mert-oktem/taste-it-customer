import React from "react";
import SignIn from "./screens/signIn/SignIn";
import Home from "./screens/home/Home";
import { StyleSheet, Dimensions } from "react-native";
import SignUp from "./screens/signUp/SignUp"
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const RootStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default RootStack;

// const styles = StyleSheet.create({
//     container: {
//       maxWidth: Dimensions.get("window").width,
//       flex: 1,
//       backgroundColor: "#fff",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   });
  