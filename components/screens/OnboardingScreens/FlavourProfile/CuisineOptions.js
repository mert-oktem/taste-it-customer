import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";

export default class CuisineOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }
  render() {
    return (
      <View style={styles.options}>
        <CheckBox
          center
          title="Japanese"
          // checked={this.state.checked}
          // onPress={() => this.setState({ checked: this.state.checked })}
        />

        <CheckBox center title="Indian" />

        <CheckBox center title="Greek" />

        <CheckBox center title="Persian" />

        <CheckBox center title="Chinese" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    marginTop: 50,
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    backgroundColor: "white",
  },
});
