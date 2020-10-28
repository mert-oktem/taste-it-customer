import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { Component } from "react";
import { Text, StyleSheet, ScrollView, View, Button } from "react-native";
import AllergyOptions from "./AllergyOptions";
import CuisineOptions from "./CuisineOptions";
import DietTypes from "./DietTypes";
import H1 from "../../../texts/H1";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default class FlavourProfile extends Component {
  createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen name="Allergies" component={AllergyOptions} />
        <MaterialTopTabs.Screen name="Cuisines" component={CuisineOptions} />
        <MaterialTopTabs.Screen name="Diet Choices" component={DietTypes} />
      </MaterialTopTabs.Navigator>
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.page}>
          <H1 h1Text="Flavour Profile" />
          <Text>Tell us what you love</Text>
          <NavigationContainer independent={true}>
            {this.createTopTabs()}
          </NavigationContainer>
          <Button
            title="Next"
            onPress={() => this.props.navigation.navigate("DeliveryInfo1")}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    marginTop: 50,
  },
});
