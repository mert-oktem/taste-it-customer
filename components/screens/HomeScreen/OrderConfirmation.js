import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator } from "react-native";
import H1 from "../../texts/H1";
import { NavigationContainer } from "@react-navigation/native";
import {
  getSubmitOrder,
  getCustomerAddress,
  getDeliveryTime,
} from "../../../services/api";

const OrderConfirmation = ({ route, navigation }) => {
  const { menuID } = route.params;
  const { price } = route.params;
  const { meal } = route.params;
  const { restaurantID } = route.params;

  const subtotal = meal * price;
  let taxNum = subtotal * 0.1;
  const tax = taxNum.toFixed(2);
  let totalNum = subtotal + taxNum;
  const total = totalNum.toFixed(2);

  const [data, setData] = React.useState({
    address: "",
    city: "",
    postcode: "",
    time: "20 mins",
    isLoaded: true
  });

  useEffect(() => {

   
    // setTimeout(() => {

    let addressTest = ""
    let cityTest = ""
    let postcodeTest = ""
      getCustomerAddress().then(
        (res) => {
          addressTest = res.address
          cityTest = res.cityDescription
          postcodeTest = res.postcode
        },
        (err) => {
          console.log(err);
        }
      );
        
    getDeliveryTime(restaurantID).then(
      (res) => {
        setData({
          ...data,
          postcode: postcodeTest,
          city: cityTest,
          address: addressTest,
          time: res,
          isLoaded: false
        });
      },
      (err) => {
        console.log(err);
      }
    );
   
    
  }, []);

  const orderSubmitHandle = () => {
    getSubmitOrder(menuID).then(
      (res) => {
        console.log(res);
        alert("order sent");
        // props.onHandleHomeChange(res,data.numberOfPeople);
        navigation.navigate("OrderTab", {navigation: navigation});
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if (data.isLoaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else{
    return (
      <ScrollView>
        <H1 h1Text="Order Confirmation" />
        <View>
          <View>
            <Text style={styles.h3Header}>Delivery Address</Text>
            <View>
              {/* <Image /> */}
              <Text style={styles.orderConfText}>
                {data.address} {data.city} {data.postcode}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.h3Header}>Estimated Delivery Time</Text>
            <View>
              {/* <Image /> */}
              <Text style={styles.orderConfText}>{data.time}</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.billingDetails}>
            <Text>Sub Total</Text>
            <Text>x{meal} Meals</Text>
            <Text>{subtotal}</Text>
          </View>
          <View style={styles.billingDetails}>
            <Text>Tax</Text>
            <Text>10%</Text>
            <Text>{tax}</Text>
          </View>
          <View style={styles.billingDetails}>
            <Text>Order Total</Text>
            <Text>{total}</Text>
          </View>
        </View>

        <Button
          title="Submit Order"
          type="submit"
          onPress={() => orderSubmitHandle()}
          // onPress={() => navigation.navigate("YourOrderScreen")}
        />
      </ScrollView>
    );
  }
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
