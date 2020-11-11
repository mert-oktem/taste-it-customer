import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import H1 from '../texts/H1';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveOrder from "./ActiveOrder"
import OrderHistory from "./OrderHistory"


const MaterialTopTabs = createMaterialTopTabNavigator();

const OrderTab = (props) => {
  const[isLoaded, setIsLoaded] = React.useState(true)
  const isFocused = useIsFocused();

  console.log(isFocused);

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
    <H1 h1Text="Order History" />
    <Text>Date</Text>
    <View>
      <Image />
      <View>
        <Text>Japanese Tsukemen</Text>
        <View>
          <Image />
          <Text>Restaurant Name</Text>
        </View>
        <View>
          <Image />
          <Text>$15</Text>
        </View>
      </View>
    </View>
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