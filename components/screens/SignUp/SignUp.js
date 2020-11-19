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
  Alert,
  TouchableOpacity,
} from "react-native";
import H1 from "../../texts/H1";
import {postCustomerInfo} from "../../../services/api"

export default function SignUp({ navigation }) {
  const { signUp } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
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
  const textInputFirstChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        firstName: val,
        isValidFirst: true,
      });
    } else {
      setData({
        ...data,
        firstName: val,
        isValidFirst: false,
      });
    }
  };
  const textInputLastChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        lastName: val,
        isValidLast: true,
      });
    } else {
      setData({
        ...data,
        lastName: val,
        isValidLast: false,
      });
    }
  };
  const textInputPhoneChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        phoneNumber: val,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phoneNumber: val,
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

    postCustomerInfo(data.email, data.password, data.firstName, data.lastName, data.phoneNumber).then(
      (res) => {
        let accessToken = res.token;
        signUp(accessToken);
        Alert.alert("Done", "user logged In", [{ text: "Okay" }]);
        navigation.navigate("Root", { screen: "WelcomeScreen2" });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require("../../../assets/foodIllustration/customerSide/SignUp2.jpg")}
      />
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Set Up Your Profile." />
          <Text style={styles.textChild}>Sign up to set up your profile</Text>
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
        <Text style={styles.text}>
                  *Contact for your delivery
                </Text>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          autoCapitalize="none"
          // value="johnRemi@hotmail.com"
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
          // value="testpassword"
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

        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => {
            registerHandle();
          }}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width * 0.7,
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
  textChild: {
    color: "#3E315A",
    lineHeight: 20,
  },
  textInput: {
    height: 50,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "#D4CDE3",
    // marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
    fontSize: 18,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 30,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
