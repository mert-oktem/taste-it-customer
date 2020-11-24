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
import Footer from "../../footer/Footer";
import { useFonts } from "expo-font";

const DishDetailScreen = ({ route, navigation }) => {
  const [orderSelected, setOrderSelected] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { orderID } = route.params;
  const [imageUrl, setImageUrl] = React.useState(null);
  const [menuID, setMenuID] = React.useState(null);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
  });
  // console.log(navigation)

  useEffect(() => {
    getCustomerActiveOrders().then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].orderID === orderID) {
          setOrderSelected(res[i]);
          setMenuID(res[i].menuID);
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
  }, []);
  if (isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Image
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").width,
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
              }}
            >
              {orderSelected.restaurantDescription}
            </Text>
          </View>
          <View>
            <View>
              <Image />
              <Text style={styles.restaurantAddress}>
                {orderSelected.address}
              </Text>
            </View>
            <View>
              <Image />
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
        {/* <Footer /> */}
      </ScrollView>
    );
  }
};

export default DishDetailScreen;

const styles = StyleSheet.create({
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
