import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const RevealConfirm = ({ route, navigation }) => {
  const { orderID } = route.params;
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.8,
          marginLeft: Dimensions.get("screen").width * 0.1,
          marginTop: Dimensions.get("screen").width * 0.1,
        }}
      >
        <Image />
        <Text style={styles.text}>
          {" "}
          Do you want to reveal what you have ordered?{" "}
        </Text>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            navigation.navigate("DishDetailScreen", { orderID: orderID });
          }}
        >
          <Text>Yes, Reveal My Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Text>No, Not Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RevealConfirm;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "NexaXBold",
    color: "#3e315a",
    marginTop: 15,
  },
  button1: {
    backgroundColor: "#d4cde3",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 25,
    marginTop: 30,
  },
  button2: {
    backgroundColor: "#632DF1",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
    fontWeight: "bold",
  },
});
