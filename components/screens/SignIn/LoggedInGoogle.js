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
import { putGoogleCustomerInfo} from "../../../services/api";
  import H1 from "../../texts/H1";

const LoggedInGoogle = ({ route, navigation }) => {
  const { firstName } = route.params;
  const { lastName } = route.params;
  const [data, setData] = React.useState({
   
    firstName: `${firstName}`,
    lastName: `${lastName}`,
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
        (res) => {
            navigation.navigate("Root", { screen: "WelcomeScreen2" });
          },
          (err) => {
            console.log(err);
            Alert.alert("Error", `Something went wrong! ${err}`);
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
          <Text style={styles.textChild}>Let's get to know each other.</Text>
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
