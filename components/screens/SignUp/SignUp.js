import React from "react";
import { AuthContext } from "../../Context";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert
} from "react-native";
import H1 from "../../texts/H1";
import InputField from "../../inputFields/InputField";
import ReusableBtn from "../../buttons/ReusableBtn";


export default function SignUp({ navigation }) {
  const { signUp } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    // check_textInputChange: false,
    // secureTextEntry: true,
    isValidUser: true,
    isValidFirst: true,
    isValidLast: true,
    isValidPhone: true,
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
  const textInputFirstChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        firstName: val,
        // check_textInputChange: true,
        isValidFirst: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        // check_textInputChange: false,
        isValidFirst: false,
      });
    }
  };
  const textInputLastChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        lastName: val,
        // check_textInputChange: true,
        isValidLast: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        // check_textInputChange: false,
        isValidLast: false,
      });
    }
  };
  const textInputPhoneChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        phoneNumber: val,
        // check_textInputChange: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: val,
        // check_textInputChange: false,
        isValidPhone: false,
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
  const handleValidFirst = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidFirst: true,
      });
    } else {
      setData({
        ...data,
        isValidFirst: false,
      });
    }
  };
  const handleValidLast = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidLast: true,
      });
    } else {
      setData({
        ...data,
        isValidLast: false,
      });
    }
  };

  const handleValidPhone = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        isValidPhone: false,
      });
    }
  };
  const registerHandle = async () => {
   
    if (
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.firstName.length == 0 ||
      data.lastName.length == 0 ||
      data.phoneNumber.length == 0
    ) {
      Alert.alert("Wrong Input!", "fields cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }

    try {
      let response = await fetch("http://localhost:5000/api/customers/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        }),
      });

      const res = await response.json();
     

      if (response.status >= 200 && response.status < 300) {
        //Handle success
        let accessToken = res.token;
        
        //On success we will store the access_token in the AsyncStorage
        
        // this.redirect('home');
        signUp(accessToken);
        Alert.alert("User Registered", "Thank you", [{ text: "Ok" }]);
      } else {
        Alert.alert("Invalid Input!", "Something went wrong, Try again", [
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
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Let's Get Started." />
          <Text>Sign up to set up your profile</Text>
        </View>
        <TextInput
          placeholder={"First Name"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputFirstChange(val)}
          onEndEditing={(e) => handleValidFirst(e.nativeEvent.text)}
          style={styles.textInput}
        />
        {data.isValidFirst ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              First Name must be 4 characters long.
            </Text>
          </View>
        )}
        <TextInput
          placeholder={"Last Name"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputLastChange(val)}
          onEndEditing={(e) => handleValidLast(e.nativeEvent.text)}
          style={styles.textInput}
        />
        {data.isValidLast ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              Last Name must be 4 characters long.
            </Text>
          </View>
        )}
        <TextInput
          placeholder={"Phone Number"}
          textContentType={"name"}
          autoCapitalize="none"
          onChangeText={(val) => textInputPhoneChange(val)}
          onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
          style={styles.textInput}
        />
        {data.isValidPhone ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              Phone Number should be more than 6 digits.
            </Text>
          </View>
        )}
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          style={styles.textInput}
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
          style={styles.textInput}
        />
        {data.isValidPassword ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </View>
        )}

        <Button
          title="Sign Up"
          type="submit"
          onPress={() => {
            registerHandle();
          }}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
        />
      </View>
    </ScrollView>
  );
}

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
  textInput: {
    height: Dimensions.get("screen").width * 0.1,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "lightgray",
    marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.02,
    fontSize: 23,
    borderRadius: 20,
    paddingLeft: 15,
  },
});
