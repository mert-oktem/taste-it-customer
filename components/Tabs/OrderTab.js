import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import H1 from "../texts/H1";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveOrder from "./ActiveOrder";
import OrderHistory from "./OrderHistory";
import ActiveOrderMade from "./ActiveOrderMade";
import OrderHistoryMade from "./OrderHistoryMade";
import { getCustomerActiveOrders } from "../../services/api";
import { set } from "react-native-reanimated";
import moment from "moment";
import { useFonts } from "expo-font";
import axios from "axios";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const MaterialTopTabs = createMaterialTopTabNavigator();

const OrderTab = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [activeOrders, setActiveOrders] = React.useState(null);
  const [isOrderLoaded, setIsOrderLoaded] = React.useState(true);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
  });
  const handleOrderNow = () => {
    props.navigation.navigate("HomeScreen");
  };
  const handleActiveOrderStatus = (orderStatus, orderID) => {
    props.navigation.navigate("OrderStatus", {
      orderStatusID: orderStatus,
      orderID: orderID,
    });
  };

  const handleOrderHistoryDetails = (orderID) => {
    props.navigation.navigate("DishDetailScreen", { orderID: orderID });
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        getCustomerActiveOrders(source).then((res) => {
          setActiveOrders(res);

          if (res.length === 0) {
            setIsLoaded(true);
          } else {
            let flag = false;
            for (let i = 0; i < res.length; i++) {
              if (res[i].orderStatusID < 4) {
                flag = true;
              }
            }
            {
              flag === true ? setIsOrderLoaded(true) : setIsOrderLoaded(false);
            }
            setIsLoaded(false);
          }
        }),
          (err) => {
            console.log(err);
          };
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      }
    };
    loadData();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [activeOrders, isLoaded, isOrderLoaded]);

  const renderOrders = () => {
    if (!fontsLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return activeOrders.map((item) => {
        const handleOrderDetail = () => {
          handleActiveOrderStatus(item.orderStatusID, item.orderID);
        };
        const date = moment(item.createdAt).format("h:mm a - YYYY.MM.DD ");
        if (item.orderStatusID < 4) {
          return (
            <ScrollView key={item.orderID} style={{ backgroundColor: "white" }}>
              <TouchableOpacity style={styles.card} onPress={handleOrderDetail}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require("../../assets/foodIllustration/customerSide/Package.png")}
                />
                <View
                  style={{
                    width: Dimensions.get("screen").width * 0.42,
                    marginLeft: 15,
                  }}
                >
                  <Text style={{ fontFamily: "NexaRegular", color: "#3e315a" }}>
                    {date}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "NexaXBold",
                      fontSize: 16,
                      marginTop: 10,
                      marginBottom: 15,
                      color: "#632df1",
                    }}
                  >
                    {item.orderStatusDescription}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NexaXBold",
                        color: "#3e315a",
                      }}
                    >
                      View Details
                    </Text>
                    <Image
                      style={{ width: 15, height: 15, marginBottom: 5 }}
                      source={require("../../assets/Icons/forwardArrow.png")}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }
      });
    }
  };

  const renderOrdersHistory = () => {
    if (!fontsLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return activeOrders.map((item) => {
        const handleOrderDetail = () => {
          handleOrderHistoryDetails(item.orderID);
        };
        if (item.orderStatusID > 3) {
          let newMenuID = item.menuID;
          if (item.menuID > 20) {
            newMenuID = 20;
          }
          let url = `https://taste-it.ca/api/menus/image/${newMenuID}`;
          return (
            <ScrollView key={item.orderID} style={{ backgroundColor: "white" }}>
              <TouchableOpacity
                key={item.orderID}
                style={styles.card2}
                onPress={handleOrderDetail}
              >
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 10,
                    marginRight: 20,
                  }}
                  source={{ uri: `${url}` }}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: "NexaXBold",
                      fontSize: 16,
                      marginTop: 10,
                      marginBottom: 15,
                      color: "#632df1",
                    }}
                  >
                    {item.menuName}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Image
                      style={{ width: 15, height: 15, marginRight: 7 }}
                      source={require("../../assets/Icons/restaurant.png")}
                    />
                    <Text
                      style={{
                        fontFamily: "NexaRegular",
                        color: "#3e315a",
                        fontSize: 12,
                        marginBottom: -5,
                      }}
                    >
                      {item.restaurantName}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 14, height: 15, marginRight: 7 }}
                      source={require("../../assets/Icons/price.png")}
                    />
                    <Text
                      style={{
                        fontFamily: "NexaRegular",
                        color: "#3e315a",
                        fontSize: 12,
                        marginBottom: -5,
                      }}
                    >
                      ${item.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          );
        }
      });
    }
  };

  const createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator
        tabBarOptions={{
          activeTintColor: "#632DF1",
          inactiveTintColor: "#D4CDE3",
          indicatorStyle: { backgroundColor: "#632DF1" },
          labelStyle: {
            fontFamily: "NexaXBold",
            fontSize: 16,
            textTransform: "capitalize",
            color: "#632DF1",
            // fontSize: 10,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => <ActiveOrder onHandleOrder={handleOrderNow} />}
        />
        <MaterialTopTabs.Screen
          name="Order History"
          children={() => <OrderHistory onHandleOrder={handleOrderNow} />}
        />
      </MaterialTopTabs.Navigator>
    );
  };

  const createTopTabsOrderMade = () => {
    // console.log("i m here")
    // console.log(activeOrders)
    return (
      <MaterialTopTabs.Navigator
        tabBarOptions={{
          activeTintColor: "#632DF1",
          inactiveTintColor: "#D4CDE3",
          indicatorStyle: { backgroundColor: "#632DF1" },
          labelStyle: {
            fontFamily: "NexaXBold",
            fontSize: 16,
            textTransform: "capitalize",
            // fontSize: 10,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => (
            <ActiveOrderMade
              key={activeOrders[0].orderID}
              // customerActiveOrders = {activeOrders}
              onRenderOrders={renderOrders}
              // changeOrderStatusID={handleOrderStausID()}
            />
          )}
        />
        <MaterialTopTabs.Screen
          name="Order History"
          children={() => (
            <OrderHistoryMade onRenderOrders={renderOrdersHistory} />
          )}
        />
      </MaterialTopTabs.Navigator>
    );
  };
  const createTopTabsOnlyOrderHistory = () => {
    return (
      <MaterialTopTabs.Navigator
        style={{ backgroundColor: "white" }}
        tabBarOptions={{
          activeTintColor: "#632DF1",
          inactiveTintColor: "#D4CDE3",
          indicatorStyle: { backgroundColor: "#D4CDE3" },
          labelStyle: {
            fontFamily: "NexaXBold",
            textTransform: "capitalize",
            fontSize: 16,
          },
        }}
      >
        <MaterialTopTabs.Screen
          style={{ backgroundColor: "white" }}
          name="Active Orders"
          children={() => <ActiveOrder onHandleOrder={handleOrderNow} />}
        />
        <MaterialTopTabs.Screen
          style={{ backgroundColor: "white" }}
          name="Order History"
          children={() => (
            <OrderHistoryMade onRenderOrders={renderOrdersHistory} />
          )}
        />
      </MaterialTopTabs.Navigator>
    );
  };
  if (isLoaded) {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 50 }}>
        <NavigationContainer independent={true}>
          {createTopTabs()}
        </NavigationContainer>
      </ScrollView>
    );
  } else {
    if (isOrderLoaded) {
      return (
        <ScrollView style={{ backgroundColor: "white", paddingTop: 50 }}>
          <NavigationContainer independent={true}>
            {createTopTabsOrderMade()}
          </NavigationContainer>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: "white", paddingTop: 50 }}>
          <NavigationContainer independent={true}>
            {createTopTabsOnlyOrderHistory()}
          </NavigationContainer>
        </ScrollView>
      );
    }
  }
};

export default OrderTab;

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    borderColor: "#d4cde3",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 30,
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
  },
  card2: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    borderColor: "#d4cde3",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
});
