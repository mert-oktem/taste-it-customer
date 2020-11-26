import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const ThanksFeedback = ({ route, navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.8,
          marginHorizontal: Dimensions.get("screen").width * 0.1,
        }}
      >
        <Image
          style={{
            width: Dimensions.get("screen").width * 0.8,
            height: Dimensions.get("screen").width * 0.8,
            alignSelf: "center",
            marginTop: 40,
            marginBottom: 40,
          }}
          source={require("../../../assets/foodIllustration/customerSide/Crepe.jpg")}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "NexaXBold",
            color: "#3E315A",
            fontSize: 16,
            marginTop: 20,
            lineHeight: 20,
          }}
        >
          {" "}
          Thank You for your feedback.{" "}
        </Text>
        <Text
          style={{
            fontFamily: "NexaRegular",
            fontSize: 16,
            color: "#3E315A",
            textAlign: "center",
            lineHeight: 20,
            marginTop: 10,
          }}
        >
          {" "}
          We look forward to serving you again{" "}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("HomeStack");
          }}
        >
          <Text style={styles.buttonText}>Order Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ThanksFeedback;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
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
