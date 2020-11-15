import React from "react";
import { AuthContext } from "../../Context";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import Users from "../../Users";
import H1 from "../../texts/H1";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthSession, WebBrowser, Linking } from 'expo'
import { TextInput } from "react-native-paper";
import { getCustomerLoginGoogle } from "../../../services/api";
import SignInGoogle from "./SignInGoogle";

export default function SignIn({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async () => {
    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert("Wrong Input!", "email or password field cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }

    try {
      let response = await fetch("http://localhost:5000/api/customers/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const res = await response.json();

      if (response.status >= 200 && response.status < 300) {
        let accessToken = res.token;

        signIn(accessToken);
        Alert.alert("Done", "user logged In", [{ text: "Okay" }]);
        navigation.navigate("Root", { screen: "Footer" });
      } else {
        Alert.alert("Invalid User!", "email or password is incorrect.", [
          { text: "Okay" },
        ]);

        let error = res;
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };






const [authResult, setAuthResult] = React.useState(null)





  const loginGoogleHandle = async () => {
    // getCustomerLoginGoogle().then(
    //   (res) => {
    //       <View>{res}</View>
    //   }, (err) => {
    //     console.log(err)
    //   }
    // )
    navigation.navigate("SignInGoogle")
  }

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require("../../../assets/foodIllustration/customerSide/SignIn.jpg")}
      />
      <ScrollView style={styles.body}>
        <H1 h1Text="Welcome Aboard," />
        <Text style={styles.para1}>Sign in to continue</Text>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.isValidUser ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              email must be 4 characters long.
            </Text>
          </View>
        )}
        <TextInput
          placeholder={"Password"}
          textContentType={"password"}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        {data.isValidPassword ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => {
            loginHandle();
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => {
            loginGoogleHandle();
          }}
        >
          <Text style={styles.buttonText}>Sign In with google</Text>
        </TouchableOpacity>
        <View style={styles.signUpText}>
          <Text style={styles.smallText}>Don't have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signUp}>Sign up now</Text>
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
    color: "#3E315A",
  },
  signUpText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").width * 0.04,
  },
  smallText: {
    fontSize: 10,
    color: "#3E315A",
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgot: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08,
    color: "#3E315A",
  },
  signUp: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08,
    color: "#632DF1",
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
