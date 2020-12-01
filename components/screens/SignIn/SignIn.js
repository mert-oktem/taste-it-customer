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
  TextInput,
} from "react-native";
import H1 from "../../texts/H1";
import { postCustomerLoginInfo, postGoogleEmail } from "../../../services/api";
import * as Google from "expo-google-app-auth";
import { useFonts } from "expo-font";

export default function SignIn({ navigation }) {
  const { signIn, signInGoogle } = React.useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
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
      },
      (err) => {
        console.log(err);
      }
    );
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
            signInGoogle(
              accessToken,
              result.user.givenName,
              result.user.familyName
            );
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
      <ScrollView style={{ backgroundColor: "white", paddingTop: 22 }}>
        <Image
          style={styles.image}
          source={require("../../../assets/foodIllustration/customerSide/SignIn.jpg")}
        />
        <ScrollView style={styles.body}>
          <H1 h1Text="Welcome Back," />
          <Text style={styles.para1}>Sign in to continue</Text>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Email</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"emailAddress"}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
          </View>
          {data.isValidUser ? null : (
            <View duration={500}>
              <Text style={styles.errorMsg}>
                email must be 4 characters long.
              </Text>
            </View>
          )}
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Password</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"password"}
              style={styles.textInput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
          </View>
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <View
              style={{ flexGrow: 1, backgroundColor: "#D4CDE3", height: 2 }}
            />
            <Text
              style={{
                fontFamily: "NexaRegular",
                fontSize: 16,
                paddingHorizontal: 10,
              }}
            >
              or
            </Text>
            <View
              style={{ flexGrow: 1, backgroundColor: "#D4CDE3", height: 2 }}
            />
          </View>
          <TouchableOpacity
            style={styles.button1}
            type="submit"
            onPress={() => {
              loginGoogleHandle();
            }}
          >
            <Text style={styles.buttonText1}>Sign In with Google</Text>
          </TouchableOpacity>
          <View style={styles.signUpText}>
            <Text style={styles.smallText}>Don't have an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUp}> Sign up now</Text>
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
  },
  body: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
    backgroundColor: "white",
  },
  para1: {
    marginBottom: Dimensions.get("screen").width * 0.02,
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
    marginBottom: Dimensions.get("screen").width * 0.25,
    color: "#632DF1",
    fontFamily: "NexaRegular",
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  button1: {
    borderColor: "#632DF1",
    backgroundColor: "white",
    borderWidth: 2,
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 25,
    marginTop: 18,
  },
  placeholder: {
    fontFamily: "NexaRegular",
    fontSize: 12,
    color: "#3e315a",
    backgroundColor: "white",
    position: "relative",
    top: 17,
    left: 19,
    lineHeight: 15,
    zIndex: 1,
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
  },
  buttonText1: {
    color: "#632DF1",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
  },
  textInput: {
    height: 50,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    // marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
    fontSize: 18,
    fontFamily: "NexaRegular",
    borderColor: "#D4CDE3",
    borderWidth: 2,
    borderRadius: 16,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  errorMsg: {
    fontFamily: "NexaRegular",
    fontSize: 12,
    color: "#3e315a",
  },
});
