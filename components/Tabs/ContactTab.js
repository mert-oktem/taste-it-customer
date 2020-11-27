import React from "react";
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
  ActivityIndicator,
} from "react-native";
import H1 from "../texts/H1";
import { postCustomerInquiry } from "../../services/api";
import { useFonts } from "expo-font";

const ContactTab = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
  });
  const [data, setData] = React.useState({
    email: "",
    name: "",
    phoneNumber: "",
    subject: "",
    body: "",
  });
  const textInputNameChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };
  const textInputEmailChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };
  const textInputPhoneNumberChange = (val) => {
    setData({
      ...data,
      phoneNumber: val,
    });
  };
  const textInputSubjectChange = (val) => {
    setData({
      ...data,
      subject: val,
    });
  };
  const textInputBodyChange = (val) => {
    setData({
      ...data,
      body: val,
    });
  };
  const onInquiryHandle = async () => {
    if (
      data.email.length == 0 ||
      data.body.length == 0 ||
      data.subject.length == 0 ||
      data.name.length == 0 ||
      data.phoneNumber.length == 0
    ) {
      Alert.alert("Wrong Input!", "fields cannot be empty.", [
        { text: "Okay" },
      ]);
      return;
    }
    postCustomerInquiry(
      data.email,
      data.name,
      data.subject,
      data.body,
      data.phoneNumber
    ).then(
      (res) => {
        Alert.alert("Thank you", [{ text: "Ok" }]);
        setData({
          ...data,
          email: "",
          name: "",
          phoneNumber: "",
          subject: "",
          body: "",
        });
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 30 }}>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.8,
            marginLeft: Dimensions.get("screen").width * 0.1,
            marginTop: Dimensions.get("screen").width * 0.05,
          }}
        >
          <H1 h1Text="Contact Us" />
          <Text
            style={{
              fontFamily: "NexaRegular",
              color: "#3e315a",
              lineHeight: 19,
              marginTop: 7,
              marginBottom: 20,
            }}
          >
            Leave us a message, we will get in touch with you as soon as
            possible.
          </Text>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Name</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"name"}
              autoCapitalize="none"
              onChangeText={(val) => textInputNameChange(val)}
              style={styles.textInput}
            />
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Email</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"emailAddress"}
              autoCapitalize="none"
              onChangeText={(val) => textInputEmailChange(val)}
              style={styles.textInput}
            />
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Phone Number</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"none"}
              autoCapitalize="none"
              onChangeText={(val) => textInputPhoneNumberChange(val)}
              style={styles.textInput}
            />
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Subject</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              textContentType={"none"}
              autoCapitalize="none"
              onChangeText={(val) => textInputSubjectChange(val)}
              style={styles.textInput}
            />
          </View>
          <View>
            <View style={{ display: "flex", zIndex: 1, flexDirection: "row" }}>
              <Text style={styles.placeholder}>Message</Text>
              <View style={{ flexGrow: 1 }} />
            </View>
            <TextInput
              multiline={true}
              textContentType={"none"}
              autoCapitalize="none"
              onChangeText={(val) => textInputBodyChange(val)}
              style={styles.textInput1}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            type="submit"
            onPress={() => {
              onInquiryHandle();
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default ContactTab;

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
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
  errorMsg: {
    fontFamily: "NexaRegular",
    fontSize: 12,
    color: "#3e315a",
  },
  textInput1: {
    height: 200,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    // marginLeft: Dimensions.get("screen").width * 0.01,
    marginRight: Dimensions.get("screen").width * 0.01,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
    fontSize: 18,
    borderColor: "#D4CDE3",
    borderWidth: 2,
    borderRadius: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 80,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "NexaXBold",
  },
});
