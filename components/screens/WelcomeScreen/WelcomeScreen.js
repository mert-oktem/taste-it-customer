import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button,
} from "react-native";
import ReusableBtn from "../../buttons/ReusableBtn";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'NexaRegular': require('../../../assets/NexaFont/NexaRegular.otf'),
    'NexaBold': require('../../../assets/NexaFont/NexaBold.otf'),

  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else{
    return (
      <ScrollView backgroundColor="white">
        <Image
          style={styles.image}
          source={require("../../../assets/foodIllustration/customerSide/Banner.jpg")}
        />
        <View style={styles.page}>
          <Text style={styles.heading}>Tailored Food Just For You.</Text>
          <Text style={styles.text}>
            Get a unique culinary experience by having a delivered surprise meal
            picked out to suit your preferences.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        {/* <ReusableBtn btnText="Get Started" /> */}
      </ScrollView>
    );
  }
  
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    width: "auto",
    // backgroundColor: "lightgray",
    // marginTop: Dimensions.get("screen").width * 0.15,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
  },
  text: {
    marginBottom: 15,
    lineHeight: 20,
    color: "#3E315A",
    fontFamily: 'NexaRegular'
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    lineHeight: 40,
    color: "#632DF1",
    fontFamily: 'NexaBold'
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: 'NexaBold'
  },
});
