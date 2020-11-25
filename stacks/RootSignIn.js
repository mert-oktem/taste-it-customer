import React from 'react';

import DishDetailScreen from "../components/screens/homeScreen/DishDetailScreen";
import EditDelivery from "../components/screens/profileScreens/EditDelivery";
import EditCustomer from "../components/screens/profileScreens/EditCustomer";
import EditFlavourProfile from "../components/screens/profileScreens/EditFlavourProfile";
import OrderStatus from "../components/tabs/OrderStatus";
import RevealConfirm from "../components/tabs/RevealConfirm";
import OrderTab from "../components/tabs/OrderTab";
import ReviewRating from "../components/screens/review/ReviewRating";
import ThanksFeedback from "../components/screens/review/ThanksFeedback";
import HomeScreen from "../components/screens/homeScreen/HomeScreen";
import Footer from "../components/footer/Footer";
import FlavourProfile from "../components/screens/onboardingScreens/flavourProfile/FlavourProfile";
import DeliveryInfo from "../components/screens/onboardingScreens/DeliveryInfo";
import OrderConfirmation from "../components/screens/homeScreen/OrderConfirmation"
import { createStackNavigator } from "@react-navigation/stack";
import {
    StyleSheet,
    Dimensions,
  } from "react-native";

const Stack = createStackNavigator();


const RootSignIn = () => {
    return (
        <Stack.Navigator style={styles.container} initialRouteName="Footer" independent={true}>
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="ReviewRating" component={ReviewRating} />
          <Stack.Screen name="ThanksFeedback" component={ThanksFeedback} />
          <Stack.Screen name="EditFlavourProfile" component={EditFlavourProfile} />
          <Stack.Screen name="FlavourProfile" component={FlavourProfile} />
          <Stack.Screen name="EditDelivery" component={EditDelivery} />
          <Stack.Screen name="EditCustomer" component={EditCustomer} />
          {/* <Stack.Screen name="DeliveryInfo1" component={DeliveryInfo} /> */}
          <Stack.Screen name="OrderTab" component={OrderTab} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
          
          <Stack.Screen name="DishDetailScreen" component={DishDetailScreen} />
          <Stack.Screen name="OrderStatus" component={OrderStatus} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="RevealConfirm" component={RevealConfirm} />
        </Stack.Navigator>
      );
}

export default RootSignIn;

const styles = StyleSheet.create({
    container: {
      maxWidth: Dimensions.get("window").width,
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
  });