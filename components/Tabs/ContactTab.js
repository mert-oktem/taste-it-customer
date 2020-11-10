import React from 'react';
import { Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Alert,
  Image } from 'react-native';
import H1 from '../texts/H1';
import {postCustomerInquiry} from "../../services/api"


const ContactTab = ({navigation}) => {
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
    })
  };
  const textInputEmailChange = (val) => {
    setData({
      ...data,
      email: val,
  })
};
const textInputPhoneNumberChange = (val) => {
  setData({
    ...data,
    phoneNumber: val,
})
};
const textInputSubjectChange = (val) => {
  setData({
    ...data,
    subject: val,
})
};
const textInputBodyChange = (val) => {
  setData({
    ...data,
    body: val,
})
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
      console.log(res)
      Alert.alert("Your Inquiry is submitted", "Thank you", [
        { text: "Ok" },
      ]);
      setData({
        ...data,
        email: "",
        name: "",
        phoneNumber: "",
        subject: "",
        body: "",
    })
    },
    (err) => {
      console.log(err);
      Alert.alert("Error", `Something went wrong! ${err}`);
    }
  );
};

  return (
    <ScrollView >
    <Image />
    <H1 h1Text="Contact Us" />
    <Text>Leave us a message, we will get in
        touch with you as soon as possible.</Text>
        <TextInput
        placeholder={"Name"}
        textContentType={"name"}
        autoCapitalize="none"
        onChangeText={(val) => textInputNameChange(val)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={"Email"}
        textContentType={"emailAddress"}
        autoCapitalize="none"
        onChangeText={(val) => textInputEmailChange(val)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={"Mobile"}
        textContentType={"none"}
        autoCapitalize="none"
        onChangeText={(val) => textInputPhoneNumberChange(val)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={"Subject"}
        textContentType={"none"}
        autoCapitalize="none"
        onChangeText={(val) => textInputSubjectChange(val)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={"Message"}
        textContentType={"none"}
        autoCapitalize="none"
        onChangeText={(val) => textInputBodyChange(val)}
        style={styles.textInput}
      />
       <Button
          title="Submit"
          type="submit"
          onPress={() => {
            onInquiryHandle();
          }}
        />
  </ScrollView>
  )
}

  

export default ContactTab;

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    marginBottom: 16
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