import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import H1 from "../../texts/H1";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  getSubmitOrder,
  getCustomerAddress,
  getDeliveryTime,
} from "../../../services/api";

const OrderConfirmation = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
  });
  const { menuID } = route.params;
  const { price } = route.params;
  const { meal } = route.params;
  const { restaurantID } = route.params;

  const subtotal = meal * price;
  let taxNum = subtotal * 0.1;
  const tax = taxNum.toFixed(2);
  let totalNum = subtotal + taxNum;
  const total = totalNum.toFixed(2);

  const [data, setData] = React.useState({
    address: "",
    city: "",
    postcode: "",
    time: "20 mins",
    isLoaded: true,
  });

  useEffect(() => {
    let addressTest = "";
    let cityTest = "";
    let postcodeTest = "";
    getCustomerAddress().then(
      (res) => {
        addressTest = res.address;
        cityTest = res.cityDescription;
        postcodeTest = res.postcode;
      },
      (err) => {
        console.log(err);
      }
    );

    getDeliveryTime(restaurantID).then(
      (res) => {
        setData({
          ...data,
          postcode: postcodeTest,
          city: cityTest,
          address: addressTest,
          time: res,
          isLoaded: false,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const orderSubmitHandle = () => {
    getSubmitOrder(menuID).then(
      () => {
        navigation.navigate("OrderStack");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if (data.isLoaded && !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.8,
            marginLeft: Dimensions.get("screen").width * 0.1,
            marginTop: Dimensions.get("screen").width * 0.1,
          }}
        >
          <H1 h1Text="Order Confirmation" />
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D4CDE3",
              marginTop: Dimensions.get("screen").width * 0.05,
              marginBottom: Dimensions.get("screen").width * 0.1,
              paddingBottom: Dimensions.get("screen").width * 0.1,
            }}
          >
            <View>
              <Text style={styles.h3Header}>Delivery Address</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: Dimensions.get("screen").width * 0.1,
                }}
              >
                <Image
                  style={styles.icons}
                  source={require("../../../assets/Icons/location.png")}
                />
                <Text style={styles.orderConfText}>
                  {data.address} {data.city} {data.postcode}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.h3Header}>Estimated Delivery Time</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.icons}
                  source={require("../../../assets/Icons/time.png")}
                />
                <Text style={styles.orderConfText}>{data.time}</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.billingDetails}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Dimensions.get("screen").width * 0.6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#3e315a",
                    fontFamily: "NexaXBold",
                  }}
                >
                  Sub Total
                </Text>
                <Text
                  style={{
                    color: "#d4cde3",
                    fontSize: 16,
                    fontFamily: "NexaRegular",
                  }}
                >
                  x{meal} Meals
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#3e315a",
                  fontFamily: "NexaXBold",
                }}
              >
                ${subtotal}
              </Text>
            </View>
            <View style={styles.billingDetails}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Dimensions.get("screen").width * 0.6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#3e315a",
                    fontFamily: "NexaXBold",
                  }}
                >
                  Tax
                </Text>
                <Text
                  style={{
                    color: "#d4cde3",
                    fontSize: 16,
                    fontFamily: "NexaRegular",
                  }}
                >
                  10%
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#3e315a",
                  fontFamily: "NexaXBold",
                }}
              >
                ${tax}
              </Text>
            </View>
            <View style={styles.billingDetails}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#632DF1",
                  fontFamily: "NexaXBold",
                }}
              >
                Order Total
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#632DF1",
                  fontFamily: "NexaXBold",
                }}
              >
                ${total}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={() => orderSubmitHandle()}
            // onPress={() => navigation.navigate("YourOrderScreen")}
          >
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  h3Header: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3e315a",
    marginBottom: 15,
    fontFamily: "NexaXBold",
  },
  icons: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  orderConfText: {
    fontSize: 16,
    color: "#3e315A",
    fontFamily: "NexaRegular",
  },
  billingDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
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
