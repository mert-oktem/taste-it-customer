import React from "react";
import { StyleSheet, Text, View } from "react-native";

const H1 = props => {
  return (
    <View>
      <Text style={styles.h1Text}>{props.h1Text}</Text>
    </View>
  );
};

export default H1;

const styles = StyleSheet.create({
  h1Text: {
    fontSize: 24,
    fontWeight: "bold"
  }
});
