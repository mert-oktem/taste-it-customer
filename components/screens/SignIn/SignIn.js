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
import InputField from "../../inputFields/InputField";
import ReusableBtn from "../../buttons/ReusableBtn";
import { TextInput } from "react-native-paper";
import axios from "axios";

export default function SignIn({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    // check_textInputChange: false,
    // secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        // check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        // check_textInputChange: false,
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
    // console.log(data.email);
    // console.log(data.password);
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
      // console.log(res);

      if (response.status >= 200 && response.status < 300) {
        //Handle success
        let accessToken = res.token;
        // console.log(accessToken);
        //On success we will store the access_token in the AsyncStorage
        // this.storeToken(accessToken);
        // this.redirect('home');
        signIn(accessToken);
        Alert.alert("Done", "user logged In", [{ text: "Okay" }]);
        navigation.navigate("WelcomeScreen1")
      } else {
        Alert.alert("Invalid User!", "email or password is incorrect.", [
          { text: "Okay" },
        ]);
        //Handle error
        let error = res;
        throw error;
      }
    } catch (error) {
      // this.setState({error: error});
      console.log(error);
      // this.setState({showProgress: false});
    }
  };

  return (
    <ScrollView>
      <Image style={styles.image} />
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
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
        <Button
          title="Sign In"
          type="submit"
          onPress={() => {
            loginHandle();
          }}
          // onPress={() => navigation.navigate("WelcomeScreen1")}
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
