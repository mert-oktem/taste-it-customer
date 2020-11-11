import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Button,
} from "react-native";
import H1 from "../texts/H1";

const OrderStatus = ({ route, navigation }) => {
  const { orderStatusID } = route.params;
  console.log(orderStatusID);
  if (orderStatusID === 1) {
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
              navigation.navigate("RevealConfirm");
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
