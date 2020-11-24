import React from "react";
import { Image, Text, ScrollView, Button } from "react-native";

export default function ActiveOrder(props) {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Image />

      <Text>No active Orders Currently</Text>

      <Button title="Order Now" onPress={props.onHandleOrder} />
    </ScrollView>
  );
}
