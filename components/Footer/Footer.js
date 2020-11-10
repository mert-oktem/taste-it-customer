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
  constructor(props) {
    super(props);
    this.state = {
      menuID: "",
      price: "",
      meal: "",
      restaurantID: "",
    };
  }
  handleHomeChange = (data, meal) => {
    const details = data[0];
    this.setState({
      menuID: details.menuID,
      price: details.price,
      meal: meal,
      restaurantID: details.restaurantID,
    });
    this.props.navigation.navigate("OrderConfirmation", {
      menuID: details.menuID,
      price: details.price,
      meal: meal,
      restaurantID: details.restaurantID,
    });
  };
  handleCustomerChange = () => {
    this.props.navigation.navigate("EditCustomer");
  };
  handleDeliveryChange = () => {
    this.props.navigation.navigate("EditDelivery");
  };
  handleFlavourChange = () => {
    this.props.navigation.navigate("EditFlavourProfile");
  };
  handleOrderNow = () => {
    this.props.navigation.navigate("HomeScreen")
  }
  BottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Home"
          style={{ marginBottom: 25 }}
          children={() => (
            <HomeScreen onHandleHomeChange={this.handleHomeChange} />
          )}
          // options={{
          //   tabBarLabel: 'Home',
          //   tabBarIcon: () => (
          //     <Icon style={[{ color: 'white' }]} size={25} name={'home'} />
          //   ),
          // }}
        />
        <MaterialBottomTabs.Screen
          name="Order History"
          children={() => (
            <OrderTab onHandleOrderNow={this.handleOrderNow} />
          )}
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
          children={() => (
            <ProfileTab onHandleCustomerChange={this.handleCustomerChange} onHandleDeliveryChange={this.handleDeliveryChange} onHandleFlavourChange={this.handleFlavourChange}/>
          )}
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
