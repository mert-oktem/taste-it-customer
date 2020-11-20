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
import { useIsFocused } from "@react-navigation/native";
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

const MaterialTopTabs = createMaterialTopTabNavigator();

const OrderTab = (props) => {
  // console.log(props)
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [activeOrders, setActiveOrders] = React.useState(null);
  const [orderStatus, setOrderStatus] = React.useState(1);
  const [isOrderLoaded, setIsOrderLoaded] = React.useState(true);
  // const [flag, setFlag] = React.useState(0);
  const [countOrderStatus, setCountOrderStatus] = React.useState(0);
  // const isFocused = useIsFocused();
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
    getCustomerActiveOrders().then((res) => {
      // console.log(res)
      setActiveOrders(res);

      if (res.length === 0) {
        setIsLoaded(true);
      } else {
        setOrderStatus(res[res.length - 1].orderStatusID);
        if (res[res.length - 1].orderStatusID < 4) {
          setIsOrderLoaded(true);
        } else {
          setIsOrderLoaded(false);
        }
        setIsLoaded(false);
      }
    }),
      (err) => {
        console.log(err);
      };
  }, [activeOrders, orderStatus, isLoaded, isOrderLoaded]);

  const renderOrders = () => {
    const [fontsLoaded] = useFonts({
      NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
      NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
    });
    return activeOrders.map((item) => {
      const handleOrderDetail = () => {
        handleActiveOrderStatus(item.orderStatusID, item.orderID);
      };
      const date = moment(item.createdAt).format("h:mm a - YYYY.MM.DD ");
      if (item.orderStatusID < 4) {
        return (
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
                  style={{ width: 20, height: 20 }}
                  source={require("../../assets/Icons/forwardArrow.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  const renderOrdersHistory = () => {
    return activeOrders.map((item) => {
      const handleOrderDetail = () => {
        handleOrderHistoryDetails(item.orderID);
      };
      if (item.orderStatusID > 3) {
        let newMenuID = item.menuID;
        if (item.menuID > 20) {
          newMenuID = 20;
        }
        let url = `http://localhost:5000/api/menus/image/${newMenuID}`;
        return (
          <TouchableOpacity style={styles.card2} onPress={handleOrderDetail}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
                marginRight: 20,
              }}
              source={require("../../assets/foodIllustration/customerSide/Package.png")}
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
                  style={{ width: 20, height: 20, marginRight: 7 }}
                  source={require("../../assets/Icons/price.png")}
                />
                <Text style={{ fontFamily: "NexaRegular" }}>
                  {item.restaurantID}
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
                  style={{ width: 20, height: 20, marginRight: 7 }}
                  source={require("../../assets/Icons/price.png")}
                />
                <Text style={{ fontFamily: "NexaRegular" }}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  const createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator>
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
      <MaterialTopTabs.Navigator>
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
      <MaterialTopTabs.Navigator style={{ backgroundColor: "white" }}>
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
      <ScrollView style={{ backgroundColor: "white" }}>
        <NavigationContainer independent={true}>
          {createTopTabs()}
        </NavigationContainer>
      </ScrollView>
    );
  } else {
    if (isOrderLoaded) {
      return (
        <ScrollView style={{ backgroundColor: "white" }}>
          <NavigationContainer independent={true}>
            {createTopTabsOrderMade()}
          </NavigationContainer>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: "white" }}>
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
    padding: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
});
