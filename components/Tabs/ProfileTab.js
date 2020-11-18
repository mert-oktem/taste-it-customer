import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Dimensions, ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCustomerInfo } from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../Context";

const ProfileTab = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [firstName, setFirstName] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [info, setInfo] = React.useState(null)
  const [value, setValue] = React.useState();
  //   const refresh = ()=>{
  //     // it re-renders the component
  //    setValue({});
  // }
  useEffect(() => {
    getCustomerInfo().then(
      (res) => {
        setInfo(res)
        setFirstName(res.firstName);
        setIsLoaded(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [info,firstName]);
if(isLoaded){
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
else {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.page}>
        <View>
          <Text style={styles.title}>Hi, {firstName}</Text>
          <Image />
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={props.onHandleCustomerChange}
        >
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
        <TouchableOpacity
          style={styles.card}
          onPress={props.onHandleDeliveryChange}
        >
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
        <TouchableOpacity
          style={styles.card}
          onPress={props.onHandleFlavourChange}
        >
          <View style={styles.cardInner}>
            <Image
              style={styles.icons}
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
            // AsyncStorage.clear();
            signOut();
            // navigation.navigate("SignIn")
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
    fontSize: 36,
    marginBottom: 16,
    color: "#632df1",
    marginBottom: Dimensions.get("screen").width * 0.1,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: Dimensions.get("screen").width * 0.1,
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
    marginLeft: 20,
    fontSize: 16,
  },
  icons: {
    width: 42,
    height: 42,
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
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 15,
    marginBottom: 30,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
