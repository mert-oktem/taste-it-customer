import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import H1 from '../texts/H1';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveOrder from "./ActiveOrder"
import OrderHistory from "./OrderHistory"
import ActiveOrderMade from "./ActiveOrderMade"
import OrderHistoryMade from "./OrderHistoryMade"
import {getCustomerActiveOrders} from "../../services/api"

const MaterialTopTabs = createMaterialTopTabNavigator();

const OrderTab = (props) => {
  const[isLoaded, setIsLoaded] = React.useState(true)
  const[activeOrders, setActiveOrders] = React.useState(null)
  const isFocused = useIsFocused();

  // console.log(isFocused);

  useEffect(() => {
    getCustomerActiveOrders().then(
      (res) => {
        // console.log(res)
        setActiveOrders(res)
        if(res.length === 0){
          setIsLoaded(true)
        }else{
          setIsLoaded(false)
        }
      }
    ), (err) => {
      console.log(err)
    }
  },[activeOrders])

 const createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => (
            <ActiveOrder onHandleOrder = {props.onHandleOrderNow}/>
          )}
        />
        <MaterialTopTabs.Screen
          name="Order History"
          children={() => (
            <OrderHistory onHandleOrder = {props.onHandleOrderNow}/>
          )}
        />
      </MaterialTopTabs.Navigator>
    );
  };
  const createTopTabsOrderMade = () => {
    // console.log("i m here")
    // console.log(activeOrders)
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => (
            <ActiveOrderMade customerActiveOrders = {activeOrders}/>
          )}
        />
        <MaterialTopTabs.Screen
          name="Order History"
          children={() => (
            <OrderHistoryMade onHandleOrder = {props.onHandleOrderNow}/>
          )}
        />
      </MaterialTopTabs.Navigator>
    );
  };
if(isLoaded){
  return (
    <ScrollView>
    <NavigationContainer independent={true}>
              {createTopTabs()}
            </NavigationContainer>
  </ScrollView>
  ) 
}else{
  return (
    <ScrollView>
    <NavigationContainer independent={true}>
              {createTopTabsOrderMade()}
            </NavigationContainer>
  </ScrollView>
  )
}
  

}



export default OrderTab;


export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    marginBottom: 16
  }
});