import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { Component } from "react";
import {StyleSheet, Image } from "react-native";

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
  // handleFlavourChange = () => {
  //   this.props.navigation.navigate("FlavourProfile");
  // };
  handleOrderNow = () => {
    this.props.navigation.navigate("Footer");
  };
  handleActiveOrderStatus = (orderStatus, orderID) => {
    this.props.navigation.navigate("OrderStatus", {
      orderStatusID: orderStatus,
      orderID: orderID,
    });
  };

  handleOrderHistoryDetails = (orderID) => {
    this.props.navigation.navigate("DishDetailScreen", { orderID: orderID });
  };
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
          children={() => (
            <HomeScreen onHandleHomeChange={this.handleHomeChange} />
          )}
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
          children={() => (
            <OrderTab
              onHandleOrderNow={this.handleOrderNow}
              onHandleActiveOrderStatus={this.handleActiveOrderStatus}
              onHandleOrderHistoryDetails={this.handleOrderHistoryDetails}
              navigation={this.props.navigation}
            />
          )}
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
          children={() => (
            <ProfileTab
              onHandleCustomerChange={this.handleCustomerChange}
              onHandleDeliveryChange={this.handleDeliveryChange}
              // onHandleFlavourChange={this.handleFlavourChange}
              navigation={this.props.navigation}
            />
          )}
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
