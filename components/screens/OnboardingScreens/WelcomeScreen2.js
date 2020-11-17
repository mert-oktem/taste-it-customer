import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import ReusableBtn from "../../buttons/ReusableBtn";
import AsyncStorage from "@react-native-community/async-storage";

const WelcomeScreen2 = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [items, setItems] = React.useState(null);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        setIsLoading(false);
        setUserToken(userToken);
        let response = await fetch("http://localhost:5000/api/customers/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${userToken}`,
          },
        });

        const res = await response.json();
        // console.log(res.firstName);

        if (response.status >= 200 && response.status < 300) {
          setItems(res.firstName);
          // Alert.alert("User Info displayed", "Thank you", [{ text: "Ok" }]);
        } else {
          Alert.alert("Invalid Input!", "Something went wrong, Try again", [
            { text: "Okay" },
          ]);
          //Handle error
          let error = res;
          throw error;
        }
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // console.log(items)
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Image
        style={styles.image}
        source={require("../../../assets/foodIllustration/customerSide/Welcome.jpg")}
      />
      <View style={styles.page}>
        <Text style={styles.text1}>Hi {items}</Text>
        <Text style={styles.heading}>Welcome Aboard!</Text>
        <Text style={styles.text2}>
          Ready for your new food experiences? Discover your next favourite food
          through mystery dishes, customized just for you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FlavourProfile")}
        >
          <Text style={styles.buttonText}>Create Flavour Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.clear();
            // navigation.navigate("SignIn")
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray",
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: 30,
  },
  text1: {
    fontSize: 16,
    color: "#3e315a",
  },
  text2: {
    marginBottom: 15,
    fontSize: 16,
    color: "#3e315a",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 40,
    color: "#632df1",
  },
  button: {
    backgroundColor: "#632DF1",
    width: Dimensions.get("screen").width * 0.8,
    // marginLeft: Dimensions.get("screen").width * 0.1,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 30,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
