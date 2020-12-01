import React from "react";
import { Image, Text, ScrollView, Button, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ActiveOrderMade(props) {
  return (
    <ScrollView style={{ backgroundColor: "white", paddingBottom: 70 }}>
      {props.onRenderOrders()}
    </ScrollView>
  );
}
