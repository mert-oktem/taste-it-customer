import React from "react";
import { Image, Text, ScrollView, Button, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ActiveOrderMade(props) {

  const [activeOrders, setActiveOrders] = React.useState(props.customerActiveOrders)


  return (
    <ScrollView>
      <Image />
      {props.onRenderOrders()}
    </ScrollView>
  );
}
