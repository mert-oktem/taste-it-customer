import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, Image} from "react-native";
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
          <Image
                style={styles.icons}
                source={{uri: `${item.icon}`}}
              />
          <Text style = {styles.optionsListText}>{item.key}</Text>
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
    paddingLeft: Dimensions.get("screen").width * 0.05,
    paddingRight: Dimensions.get("screen").width * 0.03,
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
    width: 15,
    height: 15,
  },
  optionsListText: {
    marginLeft: 30
  }
});
