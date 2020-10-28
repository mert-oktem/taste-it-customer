import React from "react";

import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import H1 from "../../texts/H1";
import InputField from "../../inputFields/InputField";
import ReusableBtn from "../../buttons/ReusableBtn";
import { TextInput } from "react-native-paper";

export default function SignIn({ navigation }) {
  return (
    <ScrollView>
      <Image style={styles.image} />
      <ScrollView style={styles.body}>
        <H1 h1Text="Welcome Aboard," />
        <Text style={styles.para1}>Sign in to continue</Text>
        <TextInput placeholder={"Email"} textContentType={"emailAddress"} />
        <TextInput placeholder={"Password"} textContentType={"password"} />
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate("WelcomeScreen1")}
        />
        <View style={styles.signUpText}>
          <Text style={styles.smallText}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgot}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray",
  },
  body: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
  },
  para1: {
    marginBottom: Dimensions.get("screen").width * 0.08,
  },
  signUpText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").width * 0.04,
  },
  smallText: {
    fontSize: 10,
  },
  forgot: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08,
  },
});
