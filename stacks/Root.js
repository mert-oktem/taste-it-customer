import React from 'react';
import WelcomeScreen from "../components/screens/welcomeScreen/WelcomeScreen";
import SignIn from "../components/screens/signIn/SignIn";
import SignUp from "../components/screens/signUp/SignUp";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


const Root = () => {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen" independent={true}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false, title: "" }}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false, title: "" }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{title: "" }}/>
        </Stack.Navigator>
      );
}

export default Root;
