import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

import OrderTab from "../tabs/OrderTab";
import ContactTab from "../tabs/ContactTab";
import ProfileTab from "../tabs/ProfileTab";
import HomeScreen from "../screens/homeScreen/HomeScreen";

const MaterialBottomTabs = createMaterialBottomTabNavigator();

export default class Footer extends Component {
  BottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Home"
          style={{ marginBottom: 25 }}
          component={HomeScreen}
          // options={{
          //   tabBarLabel: 'Home',
          //   tabBarIcon: () => (
          //     <Icon style={[{ color: 'white' }]} size={25} name={'home'} />
          //   ),
          // }}
        />
        <MaterialBottomTabs.Screen
          name="Order History"
          component={OrderTab}
          // options={{
          //   tabBarLabel: 'Profile',
          //   tabBarIcon: () => (
          //     <Icon style={[{ color: 'white' }]} size={25} name={'human'} />
          //   )
          // }}
        />
        <MaterialBottomTabs.Screen
          name="Contact"
          component={ContactTab}
          // options={{
          //   tabBarLabel: 'Map',
          //   tabBarIcon: () => (
          //     <Icon style={[{ color: 'white' }]} size={25} name={'map'} />
          //   ),
          // }}
        />
        <MaterialBottomTabs.Screen
          name="Profile"
          component={ProfileTab}
          // options={{
          //   tabBarLabel: 'Map',
          //   tabBarIcon: () => (
          //     <Icon style={[{ color: 'white' }]} size={25} name={'map'} />
          //   ),
          // }}
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

const styles = StyleSheet.create({});
