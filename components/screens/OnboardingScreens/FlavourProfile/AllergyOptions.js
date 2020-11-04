import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";

export default class AllergyOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      data:[]
    };
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <View style={styles.options}>
        <CheckBox
          center
          title="Milk"
          // checked={this.state.checked}
          // onPress={() => this.setState({ checked: this.state.checked })}
        />

        <CheckBox center title="Eggs" />

        <CheckBox center title="Fish" />

        <CheckBox center title="Crustacean Shellfish" />

        <CheckBox center title="Tree Nuts" />

        <CheckBox center title="Peanuts" />

        <CheckBox center title="Wheat" />

        <CheckBox center title="Soybeans" />
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
