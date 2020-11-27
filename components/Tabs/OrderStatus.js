import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import H1 from "../texts/H1";
import { getCustomerActiveOrders } from "../../services/api";
import { useFonts } from "expo-font";
import axios from "axios";

const OrderStatus = ({ route, navigation }) => {
  // const { orderStatusID } = route.params;
  const [orderStatusID, setOrderStatusID] = React.useState(1);
  const [orderSelected, setOrderSelected] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { orderID } = route.params;
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        getCustomerActiveOrders(source).then((res) => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].orderID === orderID) {
              setOrderSelected(res[i]);
              setOrderStatusID(res[i].orderStatusID);
              setIsLoaded(false);
            }
          }
        }),
          (err) => {
            console.log(err);
          };
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("error");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, [orderSelected, orderStatusID]);
  if (isLoaded || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (orderStatusID === 1) {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.content}>
          <H1 h1Text="Order Status" />
          {/* ***************** Order Status 1st Screen ***************** */}

          <View>
            <Image
              style={{
                width: Dimensions.get("screen").width * 0.6,
                height: Dimensions.get("screen").width * 0.755,
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 40,
              }}
              source={require("../../assets/foodIllustration/customerSide/Croissant.png")}
            />
            <Text style={styles.statusText}>
              Your order is being confirmed.
            </Text>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Order Received</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else if (orderStatusID === 2) {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.content}>
          <H1 h1Text="Order Status" />
          {/* ***************** Order Status 1st Screen ***************** */}

          <View>
            <Image
              style={{
                width: Dimensions.get("screen").width * 0.8,
                height: Dimensions.get("screen").width * 0.7,
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 40,
              }}
              source={require("../../assets/foodIllustration/customerSide/Cooking.png")}
            />
            <View style={styles.progress}>
              <View style={styles.view1}>
                <Text style={styles.text}>1</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d4cde3",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view2}>
                <Text style={styles.text}>2</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d4cde3",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view2}>
                <Text style={styles.text}>3</Text>
              </View>
            </View>
            <Text style={styles.statusText}>Your food is being prepared.</Text>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Order Received</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else if (orderStatusID === 3) {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.content}>
          <H1 h1Text="Order Status" />

          {/* ***************** Order Status 2nd Screen ***************** */}

          <View>
            <Image
              style={{
                width: Dimensions.get("screen").width * 0.7,
                height: Dimensions.get("screen").width * 0.7,
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 40,
              }}
              source={require("../../assets/foodIllustration/customerSide/Package.png")}
            />
            <View style={styles.progress}>
              <View style={styles.view1}>
                <Text style={styles.text}>1</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#632DF1",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view1}>
                <Text style={styles.text}>2</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d4cde3",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view2}>
                <Text style={styles.text}>3</Text>
              </View>
            </View>
            <Text style={styles.statusText}>Your food is being delivered.</Text>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Order Received</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  } else if (orderStatusID === 4) {
    return (
      <ScrollView style={styles.page}>
        <View style={styles.content}>
          <H1 h1Text="Order Status" />

          {/* ***************** Order Status 3rd Screen ***************** */}

          <View>
            <Image
              style={{
                width: Dimensions.get("screen").width * 0.7,
                height: Dimensions.get("screen").width * 0.7,
                alignSelf: "center",
                marginTop: 40,
                marginBottom: 40,
              }}
              source={require("../../assets/foodIllustration/customerSide/Delivered.jpg")}
            />
            <View style={styles.progress}>
              <View style={styles.view1}>
                <Text style={styles.text}>1</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#632DF1",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view1}>
                <Text style={styles.text}>2</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#632DF1",
                  flexGrow: 1,
                  height: 5,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.view1}>
                <Text style={styles.text}>3</Text>
              </View>
            </View>
            <Text style={styles.statusText}>Your food has been delivered.</Text>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("RevealConfirm", { orderID: orderID });
              }}
            >
              <Text style={styles.buttonText}>Order Received</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default OrderStatus;
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "NexaXBold",
    textAlign: "center",
  },
  view1: {
    backgroundColor: "#632DF1",
    borderRadius: 20,
    borderWidth: 7,
    borderColor: "#632df1",
    textAlign: "center",
    width: 25,
    height: 25,
  },
  view2: {
    backgroundColor: "#d4cde3",
    borderRadius: 20,
    borderWidth: 7,
    borderColor: "#d4cde3",
    textAlign: "center",
    width: 25,
    height: 25,
  },

  progress: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  page: {
    backgroundColor: "white",
  },
  content: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
  },
  button1: {
    backgroundColor: "#d4cde3",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 25,
    marginTop: 70,
  },
  button2: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 25,
    marginTop: 70,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "NexaXBold",
    color: "#3e315a",
    marginTop: 15,
  },
});
