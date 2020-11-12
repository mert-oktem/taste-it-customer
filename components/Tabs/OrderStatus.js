import React, {useEffect} from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Button, ActivityIndicator
} from "react-native";
import H1 from "../texts/H1";
import {getCustomerActiveOrders} from "../../services/api"

const OrderStatus = ({ route, navigation }) => {
  // const { orderStatusID } = route.params;
  const [orderStatusID, setOrderStatusID] = React.useState(1)
  const[orderSelected, setOrderSelected] = React.useState(null)
  const[isLoaded, setIsLoaded] = React.useState(true)
  const { orderID } = route.params;
  // console.log(orderStatusID);
  // console.log(orderID);

useEffect(() => {
  
  getCustomerActiveOrders().then(
    (res) => {
      // console.log(res)
      for(let i=0; i<res.length;i++){
        if(res[i].orderID === orderID){
          setOrderSelected(res[i])
          setOrderStatusID(res[i].orderStatusID)
          setIsLoaded(false)
        }
      }
    }
  ), (err) => {
    console.log(err)
  }
}, [orderSelected, orderStatusID]);
if (isLoaded) {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
} 


  else if (orderStatusID === 1) {
    return (
      <ScrollView>
        <H1 h1Text="Order Status" />
        {/* ***************** Order Status 1st Screen ***************** */}

        <View>
          <Image />
          
          <Text>Confirming order with the restaurants</Text>
          
        </View>
      </ScrollView>
    );
  }
  else if (orderStatusID === 2) {
    return (
      <ScrollView>
        <H1 h1Text="Order Status" />
        {/* ***************** Order Status 1st Screen ***************** */}

        <View>
          <Image />
          <View style={styles.progress}>
            <Text style={styles.text1}>1</Text>
            <Text style={styles.text2}>2</Text>
            <Text style={styles.text2}>3</Text>
          </View>
          <Text>Your food is being prepared.</Text>
          <Button title="Order Received" color="gray" />
        </View>
      </ScrollView>
    );
  }
  else if(orderStatusID === 3){
    return (
      <ScrollView>
        <H1 h1Text="Order Status" />
        
        {/* ***************** Order Status 2nd Screen ***************** */}

      <View>
        <Image />
        <View style={styles.progress}>
          <Text style={styles.text1}>1</Text>
          <Text style={styles.text1}>2</Text>
          <Text style={styles.text2}>3</Text>
        </View>
        <Text>Your food is being delivered.</Text>
        <Button title="Order Received" color="gray" />
      </View>
      </ScrollView>
    );
  }
  else if(orderStatusID === 4){
    return (
      <ScrollView>
        <H1 h1Text="Order Status" />
  
        {/* ***************** Order Status 3rd Screen ***************** */}
  
        <View>
          <Image />
          <View style={styles.progress}>
            <Text style={styles.text1}>1</Text>
            <Text style={styles.text1}>2</Text>
            <Text style={styles.text1}>3</Text>
          </View>
          <Text>Your food has been delivered.</Text>
          <Button
            title="Order Received"
            color="purple"
            onPress={() => {
              navigation.navigate("RevealConfirm", {orderID: orderID});
            }}
          />
        </View>
      </ScrollView>
    );
  }
  
};

export default OrderStatus;
const styles = StyleSheet.create({
  text1: {
    backgroundColor: "purple",
  },
  text2: {
    backgroundColor: "gray",
  },
  progress: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
