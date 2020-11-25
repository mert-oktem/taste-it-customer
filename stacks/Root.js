import React from 'react';
import WelcomeScreen from "../components/screens/welcomeScreen/WelcomeScreen";
import SignIn from "../components/screens/signIn/SignIn";
import SignUp from "../components/screens/signUp/SignUp";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


const Root = () => {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen" independent={true}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      );
}

export default Root;
