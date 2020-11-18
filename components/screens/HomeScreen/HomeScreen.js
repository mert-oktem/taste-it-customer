import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity, ActivityIndicator
} from "react-native";
import H1 from "../../texts/H1";
import RNPickerSelect from "react-native-picker-select";
import { NavigationContainer } from "@react-navigation/native";
import {
  getSuitableMenu,
  getCustomerInfo,
  getCustomerAddress,
} from "../../../services/api";
import { set } from "react-native-reanimated";

export default function HomeScreen(props) {
  // const HomeScreen = (props) => {
  const [data, setData] = React.useState({
    numberOfPeople: "",
    budget: "",
  });
  // const [count, setCount] = React.useState(1);
  const [info, setInfo] = React.useState(null)
  const [firstName, setFirstName] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true)
  useEffect(() => {
    getCustomerInfo().then(
      (res) => {
        setInfo(res)
        setFirstName(res.firstName);
        // let test = 1
        // setCount(count + 1)
        setIsLoaded(false)
      },
      (err) => {
        console.log(err);
      }
    );
    getCustomerAddress().then(
      (res) => {
        setAddress(res.address);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [info,firstName, address]);

  const noOfPeopleChange = (val) => {
    setData({
      ...data,
      numberOfPeople: val,
    });
  };

  const budgetChange = (val) => {
    setData({
      ...data,
      budget: val,
    });
  };

  const orderHandle = () => {
    getSuitableMenu(data.numberOfPeople, data.budget).then(
      (res) => {
        // console.log(res)
        props.onHandleHomeChange(res, data.numberOfPeople);
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if(isLoaded){
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else{
    return (
      <ScrollView>
        <View>
          <View style={styles.center}>
            <View style={styles.deliverNow}>
              <Image
                style={{ width: 30, height: "auto" }}
                source={require("../../../assets/Icons/accountProfile.png")}
              />
              <Text style={styles.title}>Deliver now</Text>
            </View>
            <Text style={styles.address}>{address}</Text>
          </View>
          <Image />
        </View>
        <View>
          <Text style={styles.heading}>Hello {firstName}</Text>
          <Text style={styles.box}>Explore your surprised food today.</Text>
          <View style={styles.box}>
            <Image
              style={styles.image}
              source={require("../../../assets/foodIllustration/customerSide/Nacho.png")}
            />
            <View style={styles.boxChild}>
              <View style={styles.pickerField}>
                <Text style={styles.pickerText}>Quantity</Text>
                <RNPickerSelect
                  onValueChange={(value) => noOfPeopleChange(value)}
                  items={[
                    { label: "1 Meal", value: "1" },
                    { label: "2 Meals", value: "2" },
                    { label: "3 Meals", value: "3" },
                    { label: "4 Meals", value: "4" },
                    { label: "5 Meals", value: "5" },
                  ]}
                />
              </View>
              <View style={styles.pickerField}>
                <Text style={styles.pickerText}>Budget</Text>
                <RNPickerSelect
                  onValueChange={(value) => budgetChange(value)}
                  items={[
                    { label: "$6 to $10", value: "10" },
                    { label: "$11 to $15", value: "15" },
                    { label: "$16 to $20", value: "20" },
                    { label: "+$20", value: "100" },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                type="submit"
                onPress={() => orderHandle()}
              >
                <Text style={styles.buttonText}>Submit Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  center: {
    //   flex: 1,
    //   margin: 24,
    //   justifyContent: "center",
    //   alignItems: "center",
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
  },
  deliverNow: {
    display: "flex",
    flexDirection: "row",
    // marginLeft: 0,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    color: "#3e315a",
  },
  title: {
    fontSize: 12,
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 10,
  },
  image: {
    height: Dimensions.get("screen").width * 0.6,
    width: "auto",
    position: "relative",
    top: 11,
    marginTop: 50,
    // backgroundColor: "lightgray",
  },
  box: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    color: "#3e315a",
  },
  boxChild: {
    borderColor: "#D4CDE3",
    borderTopColor: "transparent",
    borderWidth: 2,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginBottom: 50,
  },
  pickerField: {
    width: Dimensions.get("screen").width * 0.6,
    marginLeft: Dimensions.get("screen").width * 0.1,
  },
  pickerText: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#632DF1",
    width: Dimensions.get("screen").width * 0.6,
    marginLeft: Dimensions.get("screen").width * 0.1,
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
