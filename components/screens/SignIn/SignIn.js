import React, { Component } from "react";

import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import H1 from "../../Texts/H1";
import { Link } from "react-router-dom";
import InputField from "../../inputFields/InputField";
import ReusableBtn from "../../buttons/ReusableBtn";
// import { Link } from "@material-ui/core";

export class SignIn extends Component {
  render() {
    return (
      <ScrollView>
        <Image style={styles.image} />
        <ScrollView style={styles.body}>
          <H1 h1Text="Welcome Aboard," />
          <Text style={styles.para1}>Sign in to continue</Text>
          <InputField fieldLabel="Email" fieldName="email" fieldType="email" />
          <InputField
            fieldLabel="Password"
            fieldName="password"
            fieldType="password"
          />
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <ReusableBtn btnText="Sign In" />
          <View style={styles.signUpText}>
            <Text style={styles.smallText}>Don't have an account?</Text>
            <Link to="./SignUp">
              <TouchableOpacity>
                <Text style={styles.forgot}>Sign up now</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray"
  },
  body: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1
  },
  para1: {
    marginBottom: Dimensions.get("screen").width * 0.08
  },
  signUpText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").width * 0.04
  },
  smallText: {
    fontSize: 10
  },
  forgot: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08
  }
});
export default SignIn;
