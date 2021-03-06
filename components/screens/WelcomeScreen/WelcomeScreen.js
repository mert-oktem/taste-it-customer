import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";

let customFonts = {
  NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
  NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
};
const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setIsLoading(true);
  };
  useEffect(() => {
    _loadFontsAsync();
  }, []);

  if (isLoading) {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 22 }}>
        <Image
          style={styles.image}
          source={require("../../../assets/foodIllustration/customerSide/Banner.jpg")}
        />
        <View style={styles.page}>
          <Text style={styles.heading}>Food Tailored To Your Taste.</Text>
          <Text style={styles.text}>
          Get a unique culinary experience by letting us surprise you with yummy, mysetery dishes.
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
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width * 1.2,
    width: Dimensions.get("screen").width,
    // backgroundColor: "lightgray",
    // marginTop: Dimensions.get("screen").width * 0.15,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
  },
  text: {
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
    color: "#3E315A",
    fontFamily: "NexaRegular",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    lineHeight: 40,
    color: "#632DF1",
    fontFamily: "NexaXBold",
  },
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    marginBottom: 50,
    paddingBottom: 17.5,
    borderRadius: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
    lineHeight: 19,
  },
});
