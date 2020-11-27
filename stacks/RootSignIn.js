import React from "react";
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
import OrderConfirmation from "../components/screens/homeScreen/OrderConfirmation";
import { createStackNavigator } from "@react-navigation/stack";
import ContactTab from "../components/tabs/ContactTab";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet, Dimensions, Image } from "react-native";
import ProfileTab from "../components/tabs/ProfileTab";

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const RootSignIn = () => {
  return <BottomTabs />;
};
export default RootSignIn;

const HomeStack = () => {
  return (
    <Stack.Navigator
      style={styles.container}
      initialRouteName="HomeScreen"
      independent={true}
    >
      <Stack.Screen options={{headerShown: false, title: ""}} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{title: "" }}/>
      <Stack.Screen options={{headerShown: false, title: ""}} name="OrderStack" component={OrderStack} />
      <Stack.Screen name="EditDelivery" component={EditDelivery} options={{title: "" }}/>
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  return (
    <Stack.Navigator
      style={styles.container}
      initialRouteName="OrderTab"
      independent={true}
    >
      <Stack.Screen options={{title: ""}} name="OrderTab" component={OrderTab} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} options={{title: "" }}/>
      <Stack.Screen options={{headerShown: false, title: ""}} name="RevealConfirm" component={RevealConfirm}/>
      <Stack.Screen name="DishDetailScreen" component={DishDetailScreen} options={{title: "" }}/>
      <Stack.Screen name="ReviewRating" component={ReviewRating} options={{title: "" }}/>
      <Stack.Screen options={{headerShown: false, title: ""}} name="ThanksFeedback" component={ThanksFeedback} />
      <Stack.Screen options={{headerShown: false, title: ""}} name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      style={styles.container}
      initialRouteName="ProfileTab"
      independent={true}
    >
      <Stack.Screen options={{headerShown: false, title: ""}} name="ProfileTab" component={ProfileTab} />
      <Stack.Screen name="EditDelivery" component={EditDelivery} options={{title: "" }}/>
      <Stack.Screen name="EditCustomer" component={EditCustomer} options={{title: "" }} />
      <Stack.Screen name="EditFlavourProfile" component={EditFlavourProfile} options={{title: "" }}/>
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
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
        children={() => <HomeStack />}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../assets/Icons/home.png")}
              style={{ width: 26, height: 26, tintColor: tintColor }}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Orders"
        children={() => <OrderStack />}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../assets/Icons/order_history_mobile.png")}
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
              source={require("../assets/Icons/contact.png")}
              style={{ width: 26, height: 26, tintColor: tintColor }}
            />
          ),
        }}
      />
      <MaterialBottomTabs.Screen
        name="Profile"
        children={() => <ProfileStack />}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require("../assets/Icons/account_web.png")}
              style={{ width: 26, height: 26, tintColor: tintColor }}
            />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: "black",
    color: "black",
  },
});
