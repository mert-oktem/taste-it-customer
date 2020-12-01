import React from "react";
import {
  Image,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";

export default function ActiveOrder(props) {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
    NexaBold: require("../../assets/NexaFont/NexaBold.otf"),
  });
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Image
        style={{
          width: Dimensions.get("screen").width * 0.7,
          height: Dimensions.get("screen").width * 0.7,
          alignSelf: "center",
          marginTop: 40,
          marginBottom: 20,
        }}
        source={require("../../assets/foodIllustration/customerSide/Empty.png")}
      />

      <Text
        style={{
          color: "#3e315a",
          fontFamily: "NexaRegular",
          fontSize: 16,
          textAlign: "center",
          marginVertical: 30,
        }}
      >
        No active order currently
      </Text>

      <TouchableOpacity style={styles.button} onPress={props.onHandleOrder}>
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#632DF1",
    width: Dimensions.get("screen").width * 0.8,
    marginHorizontal: Dimensions.get("screen").width * 0.1,
    marginBottom: 70,
    paddingTop: 17.5,
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
