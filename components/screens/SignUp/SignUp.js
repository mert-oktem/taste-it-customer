import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Button,
} from "react-native";
import H1 from "../../texts/H1";
import InputField from "../../inputFields/InputField";
import ReusableBtn from "../../buttons/ReusableBtn";

function SignUp({ navigation }) {
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Let's Get Started." />
          <Text>Sign up to set up your profile</Text>
        </View>
        <TextInput placeholder="First Name" textContentType="givenName" />
        <TextInput placeholder="Last Name" textContentType="familyName" />

        <TextInput placeholder={"Email"} textContentType={"emailAddress"} />
        <TextInput
          placeholder={"Phone Number"}
          textContentType={"telephoneNumber"}
        />
        <TextInput placeholder={"Password"} textContentType={"password"} />

        <Button
          title="Sign Up"
          onPress={() => navigation.navigate("WelcomeScreen2")}
        />
      </View>
    </ScrollView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width * 0.56,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray",
  },
  body: {
    width: Dimensions.get("screen").width * 0.8,
    // backgroundColor: "lightgreen",
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
  },
  text: {
    marginBottom: 20,
  },
});
