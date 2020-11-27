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
export default function OrderHistory(props) {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
    NexaBold: require("../../assets/NexaFont/NexaBold.otf"),
  });
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Image />

      <Text
        style={{
          color: "#632DF1",
          fontFamily: "NexaXBold",
          fontSize: 16,
          textAlign: "center",
          marginVertical: 50,
        }}
      >
        No active Orders Currently
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
