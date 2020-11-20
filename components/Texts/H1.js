import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

const H1 = (props) => {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
  });

  return (
    <View>
      <Text style={styles.h1Text}>{props.h1Text}</Text>
    </View>
  );
};

export default H1;

const styles = StyleSheet.create({
  h1Text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#632DF1",
    fontFamily: "NexaXBold",
  },
});
