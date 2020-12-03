import React, { Component, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import H1 from "../../texts/H1";
import { putCustomerInfo } from "../../../services/api";
import { getCustomerInfo } from "../../../services/api";
import axios from "axios";

export default function EditCustomer({ navigation }) {
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
  const [firstName, setFirstName] = React.useState(null);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      getCustomerInfo(source).then(
        (res) => {
          setData({
            ...data,
            firstName: res.firstName,
            lastName: res.lastName,
            phoneNumber: res.phoneNumber,
            email: res.email,
            password: res.password,
          });
          setFirstName(res.firstName);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled");
      } else {
        throw error;
      }
    }
    return () => {
      source.cancel();
    };
  }, []);

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

  const editCustomerHandle = async () => {
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

    putCustomerInfo(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.phoneNumber
    ).then(
      (res) => {
        navigation.navigate("ProfileTab");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Account Profile" />
          <Text style={styles.textChild}>Edit your profile here</Text>
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
        <Text style={styles.text}>*Contact Info for Delivery</Text>
        <View>
          <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
            <Text style={styles.placeholder}>Email</Text>
            <View style={{ flexGrow: 1 }} />
          </View>
          <TextInput
            textContentType={"emailAddress"}
            autoCapitalize="none"
            value={data.email}
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            style={styles.textInput}
          />
        </View>
        {data.isValidUser ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
            At least 4 characters
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
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            style={styles.textInput}
          />
        </View>
        {data.isValidPassword ? null : (
          <View duration={500}>
            <Text style={styles.errorMsg}>
            At least 8 characters
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => {
            editCustomerHandle();
          }}
          // onPress={() => navigation.navigate("WelcomeScreen2")}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
    marginTop: 20,
  },
  text: {
    marginBottom: 20,
  },
  textChild: {
    fontFamily: "NexaRegular",
    fontSize: 16,
    marginTop: 10,
    color: "#3e315a",
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
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 30,
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
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
});
