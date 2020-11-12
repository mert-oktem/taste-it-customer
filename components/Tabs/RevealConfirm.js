import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

const RevealConfirm = ({ route, navigation }) => {

  const { orderID } = route.params;
  return (
    <View>
      <Image />
      <Text> Do you want to reveal what you have ordered? </Text>
      <Button
        title="Yes, Reveal My Order"
        color="purple"
        onPress={() => {
          navigation.navigate("DishDetailScreen", {orderID: orderID});
        }}
      />
      <Button
        title="No, Not Now"
        color="gray"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
    </View>
  );
};

export default RevealConfirm;

const styles = StyleSheet.create({});
