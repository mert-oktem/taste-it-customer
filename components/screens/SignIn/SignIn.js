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
  ActivityIndicator,
} from "react-native";
import Users from "../../Users";
import H1 from "../../texts/H1";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthSession, WebBrowser, Linking } from "expo";
import { TextInput } from "react-native-paper";
import {
  getCustomerInfo,
  postCustomerLoginInfo,
  postGoogleEmail,
} from "../../../services/api";
import * as Google from "expo-google-app-auth";
import { useFonts } from "expo-font";

export default function SignIn({ navigation }) {
  const { signIn, signUp } = React.useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaBold: require("../../../assets/NexaFont/NexaBold.otf"),
  });
  const [data, setData] = React.useState({
    email: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
    signedIn: false,
    googleFname: "",
    googleLname: "",
    googleEmail: "",
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
    postCustomerLoginInfo(data.email, data.password).then(
      (res) => {
        let accessToken = res.token;
        signIn(accessToken);
        Alert.alert("Done", "user logged In", [{ text: "Okay" }]);
        navigation.navigate("Root", { screen: "Footer" });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const setToken = async (accessToken) => {
    try {
      await AsyncStorage.setItem("userToken", accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  const loginGoogleHandle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "173267690533-kf2qspl8h5o9dvcnt6k9gim7eamh5gr3.apps.googleusercontent.com",
        iosClientId:
          "173267690533-tvsggv64k8i3075hrmg03526ul1r13fb.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setData({
          ...data,
          signedIn: true,
          googleFname: result.user.givenName,
          googleLname: result.user.familyName,
          googleEmail: result.user.email,
        });
        postGoogleEmail(result.user.email).then(
          (res) => {
            let accessToken = res.token;
            signIn(accessToken);
            // setToken(accessToken);
            getCustomerInfo().then((res) => {
              if (res.phoneNumber !== null) {
                navigation.navigate("Root", { screen: "Footer" });
              } else {
                navigation.navigate("Root", {
                  screen: "LoggedInGoogle",
                  params: {
                    firstName: result.user.givenName,
                    lastName: result.user.familyName,
                    email: result.user.email,
                  },
                });
              }
            }),
              (err) => {
                console.log(err);
              };

            Alert.alert("Done", "user logged In with google", [
              { text: "Okay" },
            ]);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
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
    fontFamily: "NexaRegular",
  },
  signUpText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Dimensions.get("screen").width * 0.04,
    fontFamily: "NexaRegular",
  },
  smallText: {
    fontSize: 10,
    color: "#3E315A",
    fontFamily: "NexaRegular",
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgot: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08,
    color: "#3E315A",
    fontFamily: "NexaRegular",
  },
  signUp: {
    fontSize: 10,
    textDecorationLine: "underline",
    marginBottom: Dimensions.get("screen").width * 0.08,
    color: "#632DF1",
    fontFamily: "NexaRegular",
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
    fontFamily: "NexaRegular",
  },
});
