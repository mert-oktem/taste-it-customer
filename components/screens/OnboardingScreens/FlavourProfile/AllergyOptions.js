import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import { CheckBox } from "react-native-elements";

export default class AllergyOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
    };
  }
  onchecked(id) {
    const data = this.props.allergies;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    this.setState({
      newData: data,
    });
    this.props.updateAllergies(data);
  }
  renderAllergies() {
    return this.props.allergies.map((item, key) => {
      return (
        <View key={item.id} style={styles.optionsList}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image style={styles.icons} source={{ uri: `${item.icon}` }} />
            <Text
              style={{
                fontFamily: "NexaXBold",
                fontSize: 16,
                color: "#3E315A",
                marginTop: 4,
              }}
            >
              {item.key}
            </Text>
          </View>
          <CheckBox
            key={item.id}
            onPress={() => {
              this.onchecked(item.id);
            }}
            checked={item.checked}
            // title={item.key}
            right={true}
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
    return <View style={styles.options}>{this.renderAllergies()}</View>;
  }
}
const styles = StyleSheet.create({
  options: {
    // marginTop: 50,
    // width: Dimensions.get("screen").width * 0.8,
    paddingLeft: Dimensions.get("screen").width * 0.1,
    paddingRight: Dimensions.get("screen").width * 0.05,
    paddingTop: Dimensions.get("screen").width * 0.05,
    backgroundColor: "white",
  },
  optionsList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: {
    width: 25,
    height: 24.5,
    marginRight: 20,
  },
});
