import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import { getDietType } from "../../../../services/api";
import { Button } from "react-native-paper";

export default class DietTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
    };
  }
  onchecked(id) {
    // console.log(id)
    const data = this.props.dietTypes;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    this.setState({
      newData: data,
    });
    this.props.updateDietTypes(data);
  }
  renderDietTypes() {
    return this.props.dietTypes.map((item, key) => {
      return (
        <View>
          <Image />
          <CheckBox
            key={item.id}
            onPress={() => {
              this.onchecked(item.id);
            }}
            checked={item.checked}
            title={item.key}
            center={true}
            iconRight={true}
            checkedColor="#3e315a"
            uncheckedColor="#d4cde3"
            checkedIcon="check-square"
            uncheckedIcon="square"
            containerStyle={[
              {
                borderWidth: 0,
                backgroundColor: "white",
              },
            ]}
          />
        </View>
      );
    });
  }

  render() {
    return <View style={styles.options}>{this.renderDietTypes()}</View>;
  }
}

const styles = StyleSheet.create({
  options: {
    paddingLeft: Dimensions.get("screen").width * 0.1,
    paddingRight: Dimensions.get("screen").width * 0.1,
    paddingTop: Dimensions.get("screen").width * 0.1,
    backgroundColor: "white",
  },
});
