import React from "react";
import { Image, Text, ScrollView, Button, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ActiveOrderMade(props) {

  const [activeOrders, setActiveOrders] = React.useState(props.customerActiveOrders)


  


  const renderOrders = () => {
    //   console.log(props.customerActiveOrders)
    return activeOrders.map((item) => {
      const handleOrderDetail = () =>{
        if(item.orderStatusID !== 5){
          props.onHandleActiveOrderStatus(item.orderStatusID)
          // props.changeOrderStatusID(item.orderStatusID)
        }
        
      }
      return (
        <TouchableOpacity onPress={handleOrderDetail}>
          <View>
            <Text>{item.createdAt}</Text>
            <Text>{item.orderStatusID}</Text>
            <Text>{item.orderStatusDescription}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <ScrollView>
      <Image />

      <Text>your Orders Currently</Text>
      {renderOrders()}
    </ScrollView>
  );
}
