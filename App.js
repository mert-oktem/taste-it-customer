import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import ResusableBtn from "./components/buttons/ReusableBtn";
import InputField from "./components/inputFields/InputField";
import SignIn from "./components/screens/SignIn/SignIn";
import SignUp from "./components/screens/SignUp/SignUp";
import DeliveryInfo from "./components/screens/OnboardingScreens/DeliveryInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/screens/Home/Home";
import WelcomeScreen from "./components/screens/WelcomeScreen/WelcomeScreen";
import WelcomeScreen2 from "./components/screens/OnboardingScreens/WelcomeScreen2";

export default function App() {
  return (
    <Router>
      <View style={styles.container}>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
        {/* <DeliveryInfo /> */}

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/DeliveryInfo" component={DeliveryInfo} />
          <Route path="/WelcomeScreen1" component={WelcomeScreen} />
          <Route path="/WelcomeScreen2" component={WelcomeScreen2} />
        </Switch>
      </View>
    </Router>
  );
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
