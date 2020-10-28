import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, Button } from "react-native";
import { CheckBox } from "react-native-elements";

export default function DietTypes({ navigation }) {
  return (
    <View style={styles.options}>
      <CheckBox
        center
        title="Vegetarian"
        // checked={this.state.checked}
        // onPress={() => this.setState({ checked: this.state.checked })}
      />

      <CheckBox center title="Non-Vegetarian" />

      <CheckBox center title="Halal" />
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    marginTop: 50,
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    backgroundColor: "white",
  },
});
