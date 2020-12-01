import React from "react";
import { Image, Text, ScrollView, Button } from "react-native";

export default function OrderHistoryMade(props) {
  return (
    <ScrollView style={{ backgroundColor: "white", paddingBottom: 70 }}>
      <Image />
      {props.onRenderOrders()}
    </ScrollView>
  );
}
