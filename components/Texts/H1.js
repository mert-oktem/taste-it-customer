import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";

const H1 = (props) => {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
  });
  if (fontsLoaded) {
    return (
      <View>
        <Text style={styles.h1Text}>{props.h1Text}</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default H1;

const styles = StyleSheet.create({
  h1Text: {
    fontSize: 30,
    lineHeight: 39,
    fontWeight: "bold",
    color: "#632DF1",
    fontFamily: "NexaXBold",
  },
});
