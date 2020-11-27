import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import { getCuisine } from "../../../../services/api";
import { Button } from "react-native-paper";

export default class CuisineOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
    };
  }

  onchecked(id) {
    const data = this.props.cuisines;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    this.setState({
      newData: data,
    });
    this.props.updateCuisines(data);
  }
  renderCuisines() {
    return this.props.cuisines.map((item, key) => {
      return (
        <View key={item.id} style={styles.optionsList}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
    return <View style={styles.options}>{this.renderCuisines()}</View>;
  }
}

const styles = StyleSheet.create({
  options: {
    // marginTop: 50,
    // width: Dimensions.get("screen").width * 0.8,
    paddingLeft: Dimensions.get("screen").width * 0.065,
    paddingRight: Dimensions.get("screen").width * 0.015,
    paddingBottom: Dimensions.get("screen").width * 0.13,
    paddingTop: Dimensions.get("screen").width * 0.05,
    backgroundColor: "white",
  },
  optionsList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  icons: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
});
