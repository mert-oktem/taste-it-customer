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
} from "react-native";
import H1 from "../../texts/H1";
import { putCustomerInfo } from "../../../services/api";
import { getCustomerInfo } from "../../../services/api";
import axios from "axios"

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
    try{
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
          setFirstName(res.firstName)
        },
        (err) => {
          console.log(err);
        }
      );
    }catch (error) {
        // if (axios.isCancel(error)) {
        //   console.log("cancelled");
        // } else {
          throw error;
        // }
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
        navigation.navigate("Footer");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.text}>
          <H1 h1Text="Hello" />
          <Text>{firstName}</Text>
        </View>
        <TextInput
          placeholder={"First Name"}
          textContentType={"name"}
          autoCapitalize="none"
          value={data.firstName}
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
          value={data.lastName}
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
          value={data.phoneNumber}
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
         <Text style={styles.text}>*Contact for your delivery</Text>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          autoCapitalize="none"
          value={data.email}
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
          title="Save"
          type="submit"
          onPress={() => {
            editCustomerHandle();
          }}
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
