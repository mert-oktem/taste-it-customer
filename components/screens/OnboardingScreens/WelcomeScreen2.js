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
import { getCustomerInfo } from "../../../services/api";
import { useFonts } from "expo-font";
import axios from "axios";

const WelcomeScreen2 = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState(null);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = () => {
      try{
        getCustomerInfo(source).then(
          (res) => {
            setItems(res.firstName);
            setIsLoading(false);
          },
          (err) => {
            console.log(err);
          }
        );
      }catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };
    loadData();
    return () => {
      source.cancel();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.clear();
            // navigation.navigate("SignIn")
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity> */}
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
    fontFamily: "NexaRegular",
  },
  text2: {
    marginBottom: 15,
    fontSize: 16,
    color: "#3e315a",
    lineHeight: 24,
    fontFamily: "NexaRegular",
  },
  heading: {
    fontSize: 32,
    fontFamily: "NexaXBold",
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
    fontFamily: "NexaXBold",
    fontSize: 16,
  },
});
