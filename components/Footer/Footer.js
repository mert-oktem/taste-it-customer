import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

import OrderTab from "../tabs/OrderTab";
import ContactTab from "../tabs/ContactTab";
import ProfileTab from "../tabs/ProfileTab";
import HomeScreen from "../screens/homeScreen/HomeScreen";

const MaterialBottomTabs = createMaterialBottomTabNavigator();

export default class Footer extends Component {
  constructor(props) {
    super(props);
  }
  BottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator
        style={styles.footer}
        activeColor="black"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: "white" }}
      >
        <MaterialBottomTabs.Screen
          name="Home"
          style={{ marginBottom: 20 }}
          children={() => <HomeScreen navigation={this.props.navigation} />}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/Icons/home.png")}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="Orders"
          children={() => <OrderTab navigation={this.props.navigation} />}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/Icons/order_history_mobile.png")}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="Contact"
          component={ContactTab}
          options={{
            tabBarLabel: "Contact",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/Icons/contact.png")}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="Profile"
          children={() => <ProfileTab navigation={this.props.navigation} />}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
              <Image
                source={require("../../assets/Icons/account_web.png")}
                style={{ width: 26, height: 26, tintColor: tintColor }}
              />
            ),
          }}
        />
      </MaterialBottomTabs.Navigator>
    );
  };
  render() {
    return (
      <NavigationContainer independent={true}>
        {this.BottomTabs()}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "black",
    color: "black",
  },
});
