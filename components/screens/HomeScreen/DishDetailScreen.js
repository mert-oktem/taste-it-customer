import React, { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import H1 from "../../texts/H1";
import { getCustomerActiveOrders } from "../../../services/api";
import { useFonts } from "expo-font";
import axios from "axios";
import Stars from "../review/stars/Stars";

const DishDetailAfterReview = ({ route, navigation }) => {
  const [orderSelected, setOrderSelected] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { orderID } = route.params;
  const [imageUrl, setImageUrl] = React.useState(null);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
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
              let newMenuID = res[i].menuID;
              if (res[i].menuID > 20) {
                newMenuID = 20;
              }
              let url = `https://taste-it.ca/api/menus/image/${newMenuID}`;
              setImageUrl(url);
              setIsLoaded(false);
            }
          }
        }),
          (err) => {
            console.log(err);
          };
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, []);
  if (isLoaded || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (orderSelected.rate === null) {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Image
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").width * 1.26,
          }}
          source={{ uri: `${imageUrl}` }}
        />
        <View
          style={{
            paddingLeft: Dimensions.get("screen").width * 0.1,
            paddingRight: Dimensions.get("screen").width * 0.1,
            paddingTop: Dimensions.get("screen").width * 0.1,
            position: "relative",
            backgroundColor: "white",
            top: -25,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ marginBottom: Dimensions.get("screen").width * 0.1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "NexaXBold",
                color: "#3e315a",
                marginBottom: 10,
              }}
            >
              Your dish was
            </Text>
            <H1 h1Text={orderSelected.menuName} />
            <Text
              style={{
                fontFamily: "NexaRegular",
                marginTop: 15,
                lineHeight: 24,
                fontSize: 16,
                color: "#3e315a",
              }}
            >
              {orderSelected.menuDescription}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "NexaXBold",
                marginBottom: 10,
                color: "#3e315a",
              }}
            >
              Served by
            </Text>
            <H1 h1Text={orderSelected.restaurantName} />
            <Text
              style={{
                fontFamily: "NexaRegular",
                marginTop: 15,
                lineHeight: 24,
                fontSize: 16,
                color: "#3e315a",
              }}
            >
              {orderSelected.restaurantDescription}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 32, marginRight: 10 }}
                source={require("../../../assets/Icons/location.png")}
              />
              <Text style={styles.restaurantAddress}>
                {orderSelected.address}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 30, height: 32, marginRight: 10 }}
                source={require("../../../assets/Icons/phone.png")}
              />
              <Text style={styles.restaurantAddress}>
                {orderSelected.phoneNumber}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            //  type="submit"
            onPress={() =>
              navigation.navigate("ReviewRating", { orderID: orderID })
            }
          >
            <Text style={styles.buttonText}>Review & Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Image
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").width * 1.26,
          }}
          source={{ uri: `${imageUrl}` }}
        />

        <View
          style={{
            marginBottom: Dimensions.get("screen").width * 0.1,
            backgroundColor: "#FFFCF5",
            paddingLeft: Dimensions.get("screen").width * 0.1,
            paddingRight: Dimensions.get("screen").width * 0.1,
            paddingTop: Dimensions.get("screen").width * 0.1,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            position: "relative",
            top: -25,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: Dimensions.get("screen").width * 0.45 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontFamily: "NexaXBold",
                  color: "#3e315a",
                  marginBottom: 10,
                }}
              >
                Your Rating
              </Text>
              <Stars rating={orderSelected.rate} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "NexaXBold",
                  color: "#3e315a",
                  marginBottom: 10,
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  fontFamily: "NexaXBold",
                  color: "#632DF1",
                  marginVertical: 5,
                  fontSize: 24,
                }}
              >
                ${orderSelected.price}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingLeft: Dimensions.get("screen").width * 0.1,
            paddingRight: Dimensions.get("screen").width * 0.1,
            // paddingTop: Dimensions.get("screen").width * 0.1,
            position: "relative",
            backgroundColor: "white",
            top: -25,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ marginBottom: Dimensions.get("screen").width * 0.1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "NexaXBold",
                color: "#3e315a",
                marginBottom: 10,
              }}
            >
              Dish Description
            </Text>
            <H1 h1Text={orderSelected.menuName} />
            <Text
              style={{
                fontFamily: "NexaRegular",
                marginTop: 15,
                lineHeight: 24,
                fontSize: 16,
                color: "#3e315a",
              }}
            >
              {orderSelected.menuDescription}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "NexaXBold",
                marginBottom: 10,
                color: "#3e315a",
              }}
            >
              Served by
            </Text>
            <H1 h1Text={orderSelected.restaurantName} />
            <Text
              style={{
                fontFamily: "NexaRegular",
                marginTop: 15,
                marginBottom: 25,
                // maxHeight: 100,
                lineHeight: 24,
                fontSize: 16,
                color: "#3e315a",
              }}
            >
              {orderSelected.restaurantDescription}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 32, marginRight: 10 }}
              source={require("../../../assets/Icons/location.png")}
            />
            <Text style={styles.restaurantAddress}>
              {orderSelected.address}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 30, height: 32, marginRight: 10 }}
              source={require("../../../assets/Icons/phone.png")}
            />
            <Text style={styles.restaurantAddress}>
              {orderSelected.phoneNumber}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default DishDetailAfterReview;

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
  restaurantAddress: {
    fontFamily: "NexaRegular",
    fontSize: 16,
    color: "#3e315a",
  },
});
