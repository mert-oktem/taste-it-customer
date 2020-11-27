import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCustomerInfo } from "../../services/api";
import { AuthContext } from "../Context";
import { useFonts } from "expo-font";
import axios from "axios";

const ProfileTab = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [firstName, setFirstName] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [info, setInfo] = React.useState(null);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../assets/NexaFont/NexaXBold.otf"),
    NexaBold: require("../../assets/NexaFont/NexaBold.otf"),
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const loadData = () => {
      try {
        getCustomerInfo(source).then(
          (res) => {
            setInfo(res);
            setFirstName(res.firstName);
            setIsLoaded(false);
          },
          (err) => {
            console.log(err);
          }
        );
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
  }, [info, firstName]);

  const handleCustomerChange = () => {
    props.navigation.navigate("EditCustomer");
  };
  const handleDeliveryChange = () => {
    props.navigation.navigate("EditDelivery");
  };

  const handleFlavourChange = () => {
    props.navigation.navigate("EditFlavourProfile");
  };
  if (isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 60,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 60,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 60 }}>
        <View style={styles.page}>
          <View>
            <Text style={styles.title}>Hi, {firstName}</Text>
            <Image />
          </View>
          <TouchableOpacity style={styles.card} onPress={handleCustomerChange}>
            <View style={styles.cardInner}>
              <Image
                style={styles.icons}
                source={require("../../assets/Icons/accountProfile.png")}
              />
              <Text style={styles.cardText}>Account Profile</Text>
            </View>
            <Image
              style={styles.arrow}
              source={require("../../assets/Icons/forwardArrow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={handleDeliveryChange}>
            <View style={styles.cardInner}>
              <Image
                style={styles.icons}
                source={require("../../assets/Icons/deliveryInformation.png")}
              />
              <Text style={styles.cardText}>Delivery Information</Text>
            </View>
            <Image
              style={styles.arrow}
              source={require("../../assets/Icons/forwardArrow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={handleFlavourChange}>
            <View style={styles.cardInner}>
              <Image
                style={styles.icons2}
                source={require("../../assets/Icons/flavourProfile.png")}
              />
              <Text style={styles.cardText}>Flavour Profile</Text>
            </View>
            <Image
              style={styles.arrow}
              source={require("../../assets/Icons/forwardArrow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // signOutHandler();
              signOut();
            }}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default ProfileTab;

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    color: "#632df1",
    fontFamily: "NexaXBold",
    marginBottom: Dimensions.get("screen").width * 0.1,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.05,
    backgroundColor: "white",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#d4cde3",
    borderRadius: 15,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cardInner: {
    display: "flex",
    flexDirection: "row",
  },
  cardText: {
    color: "#3e315a",
    alignSelf: "center",
    fontFamily: "NexaBold",
    marginLeft: 20,
    fontSize: 16,
  },
  icons: {
    width: 42,
    height: 42,
    marginLeft: 20,
  },
  icons2: {
    width: 42,
    height: 44,
    marginLeft: 20,
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 20,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#632DF1",
    width: Dimensions.get("screen").width * 0.8,
    // marginLeft: Dimensions.get("screen").width * 0.1,
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 50,
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
    fontWeight: "bold",
  },
});
