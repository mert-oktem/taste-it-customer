import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import H1 from "../../texts/H1";

const OrderConfirmation = ({ navigation }) => {
  return (
    <ScrollView>
      <H1 h1Text="Order Confirmation" />
      <View>
        <View>
          <Text style={styles.h3Header}>Delivery Address</Text>
          <View>
            <Image />
            <Text style={styles.orderConfText}>
              5728 University Blvd #101 V6TIK6
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.h3Header}>Estimated Delivery Time</Text>
          <View>
            <Image />
            <Text style={styles.orderConfText}>20 mins</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.billingDetails}>
          <Text>Sub Total</Text>
          <Text>x2 Meals</Text>
          <Text>$50</Text>
        </View>
        <View style={styles.billingDetails}>
          <Text>Tax</Text>
          <Text>10%</Text>
          <Text>$5</Text>
        </View>
        <View style={styles.billingDetails}>
          <Text>Order Total</Text>
          <Text>$55</Text>
        </View>
      </View>

      <Button
        title="Submit Order"
        onPress={() => navigation.navigate("YourOrderScreen")}
      />
    </ScrollView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
