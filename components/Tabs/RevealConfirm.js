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
import { useFonts } from "expo-font";

const RevealConfirm = ({ route, navigation }) => {
  const { orderID } = route.params;
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
    NexaBold: require("../../assets/NexaFont/NexaBold.otf"),
  });

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.8,
          marginLeft: Dimensions.get("screen").width * 0.1,
          marginTop: Dimensions.get("screen").width * 0.1,
        }}
      >
        <Image
          style={{
            width: 171,
            height: 159,
            marginTop: 85,
            marginLeft: 102,
            marginBottom: 30,
          }}
          source={require("../../assets/foodIllustration/customerSide/OpenBox.png")}
        />
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
          <Text
            style={{
              color: "white",
              fontFamily: "NexaXBold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Yes, Reveal My Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Text
            style={{
              color: "#632DF1",
              fontFamily: "NexaXBold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            No, Not Now
          </Text>
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
    fontFamily: "NexaBold",
    color: "#3e315a",
    marginTop: 15,
    lineHeight: 24,
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
    borderColor: "#632DF1",
    backgroundColor: "white",
    borderWidth: 2,
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
