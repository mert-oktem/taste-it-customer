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
  Alert,
  TouchableOpacity,
} from "react-native";
import { putGoogleCustomerInfo } from "../../../services/api";
import H1 from "../../texts/H1";

const LoggedInGoogle = ({ navigation }) => {
  // const { firstName } = route.params;
  // const { lastName } = route.params;
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",

    isValidFirst: true,
    isValidLast: true,
    isValidPhone: true,
  });

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
  const registerGoogleHandle = async () => {
    if (
      data.firstName.length == 0 ||
      data.lastName.length == 0 ||
      data.phoneNumber.length == 0
    ) {
      Alert.alert("Wrong Input!", "fields cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }

    putGoogleCustomerInfo(data.firstName, data.lastName, data.phoneNumber).then(
      () => {
        navigation.navigate("RootSignUp");
      },
      (err) => {
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Image
        style={styles.image}
        source={require("../../../assets/foodIllustration/customerSide/SignUp2.jpg")}
      />
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Set Up Your Profile." />
          <Text style={styles.textChild}>Let's get to know each other.</Text>
        </View>
        <View>
          <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
            <Text style={styles.placeholder}>First Name</Text>
            <View style={{ flexGrow: 1 }} />
          </View>
          <TextInput
            textContentType={"name"}
            autoCapitalize="none"
            value={data.firstName}
            onChangeText={(val) => textInputFirstChange(val)}
            onEndEditing={(e) => handleValidFirst(e.nativeEvent.text)}
            style={styles.textInput}
          />
        </View>
        {data.isValidFirst ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
            At least 4 characters
            </Text>
          </View>
        )}
        <View>
          <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
            <Text style={styles.placeholder}>Last Name</Text>
            <View style={{ flexGrow: 1 }} />
          </View>
          <TextInput
            textContentType={"name"}
            autoCapitalize="none"
            value={data.lastName}
            onChangeText={(val) => textInputLastChange(val)}
            onEndEditing={(e) => handleValidLast(e.nativeEvent.text)}
            style={styles.textInput}
          />
        </View>
        {data.isValidLast ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
            At least 4 characters
            </Text>
          </View>
        )}
        <View>
          <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
            <Text style={styles.placeholder}>Phone Number*</Text>
            <View style={{ flexGrow: 1 }} />
          </View>
          <TextInput
            textContentType={"name"}
            autoCapitalize="none"
            value={data.phoneNumber}
            onChangeText={(val) => textInputPhoneChange(val)}
            onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
            style={styles.textInput}
          />
        </View>

        {data.isValidPhone ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
            At least 6 characters
            </Text>
          </View>
        )}
        <Text style={styles.text1}>*Contact Info for Delivery</Text>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => {
            registerGoogleHandle();
          }}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoggedInGoogle;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width * 0.7,
    marginTop: 22,
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
  text1: {
    marginBottom: 10,
    fontSize: 12,
    fontFamily: "NexaRegular",
    color: "#3e315a",
  },
  textChild: {
    color: "#3E315A",
    lineHeight: 20,
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
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 50,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
