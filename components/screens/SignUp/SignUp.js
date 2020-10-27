import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import H1 from "../../Texts/H1";
import InputField from "../../InputFields/InputField";
import ReusableBtn from "../../Buttons/ReusableBtn";

function SignUp() {
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Let's Get Started." />
          <Text>Sign up to set up your profile</Text>
        </View>
        <InputField fieldLabel="First Name" fieldType="text" />
        <InputField fieldLabel="Last Name" fieldType="text" />
        <InputField fieldLabel="Email" fieldType="email" />
        <InputField
          fieldLabel="Phone number"
          fieldType="number"
          helperText="*Contact info for the delivery"
        />
        <InputField
          fieldLabel="Password"
          fieldType="password"
          helperText="At least 8 characters"
        />

        <ReusableBtn btnText="Sign Up" />
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width * 0.56,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray"
  },
  body: {
    width: Dimensions.get("screen").width * 0.8,
    // backgroundColor: "lightgreen",
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1
  },
  text: {
    marginBottom: 20
  }
});
