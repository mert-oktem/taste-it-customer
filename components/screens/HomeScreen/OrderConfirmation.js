import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import H1 from "../../texts/H1";
import { NavigationContainer } from "@react-navigation/native";
import {getSubmitOrder} from "../../../services/api"

const OrderConfirmation = ({ route, navigation }) => {
  const {menuID} = route.params
  const {price} = route.params
  const {meal} = route.params
  
  const subtotal = meal * price;
  const tax = subtotal * .10;
  const total = subtotal + tax;

  const orderSubmitHandle = () => {
    getSubmitOrder(menuID).then(
      (res) => {
        // console.log(res)
        alert("order sent");
        console.log(res)
        // props.onHandleHomeChange(res,data.numberOfPeople);
        navigation.navigate("YourOrderScreen");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    )
  }
  return (
    <ScrollView>
      <H1 h1Text="Order Confirmation" />
      <View>
        <View>
          <Text style={styles.h3Header}>Delivery Address</Text>
          <View>
            {/* <Image /> */}
            <Text style={styles.orderConfText}>
              5728 University Blvd #101 V6TIK6
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.h3Header}>Estimated Delivery Time</Text>
          <View>
            {/* <Image /> */}
            <Text style={styles.orderConfText}>20 mins</Text>
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
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
