import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity, Button
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
    props.navigation.navigate("Footer");
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
      setOrderStatus(res[res.length - 1].orderStatusID);  
      if (res.length === 0) {
        setIsLoaded(true);
      }
      
      else { 
        setIsLoaded(false);
        if(res[res.length-1].orderStatusID >= 4){
          setIsOrderLoaded(false);
          
        } 
        else{
        
          setIsOrderLoaded(true);
        }
        
      }
 
    }),
      (err) => {
        console.log(err);
      };
  }, [activeOrders, orderStatus]);

  const createTopTabs = () => {
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => (
            <ActiveOrder onHandleOrder={props.onHandleOrderNow} />
          )}
        />
        <MaterialTopTabs.Screen
          name="Order History"
          children={() => (
            <OrderHistory onHandleOrder={props.onHandleOrderNow} />
          )}
        />
      </MaterialTopTabs.Navigator>
    );
  };
  

  const renderOrders = () => {
        return activeOrders.map((item) => {
          const handleOrderDetail = () => {
            handleActiveOrderStatus(item.orderStatusID, item.orderID);
          }; 
          const date = moment(item.createdAt).format("h:mm a - YYYY.MM.DD ");
          if (item.orderStatusID < 4) {
            return (
              <TouchableOpacity onPress={handleOrderDetail}>
                <View>
                  <Text>{date}</Text>
                  <Text>{item.orderStatusDescription}</Text>
                  <Text>View Details</Text>
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
        
        return (
          <TouchableOpacity onPress={handleOrderDetail}>
            <View>
              <Text>{item.menuName}</Text>
              <Text>{item.restaurantID}</Text>
              <Text>{item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    });
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
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen
          name="Active Orders"
          children={() => (
            <ActiveOrder onHandleOrder={props.onHandleOrderNow} />
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
  if (isLoaded) {
    return (
      <ScrollView>
        <NavigationContainer independent={true}>
        {createTopTabs()} 
        </NavigationContainer>
      </ScrollView>
    );
   
  } else {
    
    if (isOrderLoaded){
      return (
        <ScrollView>
          <NavigationContainer independent={true}>
          {createTopTabsOrderMade()}
          </NavigationContainer>
        </ScrollView>
      );
    }else{
      return (
        <ScrollView>
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
});
