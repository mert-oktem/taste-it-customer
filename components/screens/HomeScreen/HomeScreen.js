import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  getSuitableMenu,
  getCustomerInfo,
  getCustomerAddress,
} from "../../../services/api";
import { useFonts } from "expo-font";
import axios from "axios";

const HomeScreen = (props) => {
  const [data, setData] = React.useState({
    numberOfPeople: "",
    budget: "",
  });
  const [info, setInfo] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
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

        setIsLoaded(false);
      } catch (error) {
        // if (axios.isCancel(error)) {
        //   console.log("cancelled");
        // } else {
        throw error;
        // }
      }
    };

    loadData();
    return () => {
      source.cancel();
    };
  }, [info, firstName, address, city]);

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

  const handleHomeChange = (data, meal) => {
    const details = data[0];
    props.navigation.navigate("OrderConfirmation", {
      menuID: details.menuID,
      price: details.price,
      meal: meal,
      restaurantID: details.restaurantID,
    });
  };

  const orderHandle = () => {
    getSuitableMenu(data.numberOfPeople, data.budget).then(
      (res) => {
        handleHomeChange(res, data.numberOfPeople);
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };
  if (isLoaded || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white", paddingTop: 30 }}>
        <View>
          <View style={styles.center}>
            <View style={styles.deliverNow}>
              <Image
                style={{ width: 30, height: "auto" }}
                source={require("../../../assets/Icons/location.png")}
              />
              <Text style={styles.title}>Deliver now</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.address}>
                {address} {city}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("EditDelivery")}
              >
                <Image
                  style={{ width: 22, height: 22 }}
                  source={require("../../../assets/Icons/addressEdit.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Image />
        </View>
        <View>
          <Text style={styles.heading}>Hello {firstName}</Text>
          <Text style={styles.box}>Explore your surprise food today.</Text>
          <View style={styles.box}>
            <Image
              style={styles.image}
              source={require("../../../assets/foodIllustration/customerSide/Nacho.png")}
            />
            <View style={styles.boxChild}>
              <View style={styles.pickerField}>
                <Text style={styles.pickerText}>Quantity</Text>
                <View style={styles.picker}>
                  <RNPickerSelect
                    onValueChange={(value) => noOfPeopleChange(value)}
                    style={{ fontFamily: "NexaRegular" }}
                    // textInputProps={{ fontFamily: "NexaRegular" }}
                    items={[
                      { label: "1 Meal", value: "1" },
                      { label: "2 Meals", value: "2" },
                      { label: "3 Meals", value: "3" },
                      { label: "4 Meals", value: "4" },
                      { label: "5 Meals", value: "5" },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.pickerField2}>
                <Text style={styles.pickerText}>Budget per meal</Text>
                <View style={styles.picker}>
                  <RNPickerSelect
                    onValueChange={(value) => budgetChange(value)}
                    items={[
                      { label: "$6 to $10", value: "10" },
                      { label: "$10 to $15", value: "15" },
                      { label: "$15 to $20", value: "20" },
                      { label: "+$20", value: "100" },
                    ]}
                  />
                </View>
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
};
export default HomeScreen;

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
    marginTop: Dimensions.get("screen").width * 0.05,
    marginBottom: Dimensions.get("screen").width * 0.045,
    marginLeft: -5,
  },
  heading: {
    fontSize: 32,
    fontFamily: "NexaXBold",
    marginTop: 20,
    marginBottom: 10,
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    color: "#3e315a",
  },
  title: {
    fontSize: 12,
    fontFamily: "NexaRegular",
    color: "#3E315A",
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 3,
  },
  address: {
    fontSize: 16,
    fontFamily: "NexaXBold",
    color: "#632DF1",
  },
  image: {
    height: Dimensions.get("screen").width * 0.47,
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
    fontFamily: "NexaRegular",
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
    marginTop: 20,
  },
  pickerField2: {
    width: Dimensions.get("screen").width * 0.6,
    marginLeft: Dimensions.get("screen").width * 0.1,
    // marginTop: 10,
  },
  pickerText: {
    textAlign: "center",
    fontFamily: "NexaRegular",
    color: "#3e315A",
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#632DF1",
    width: Dimensions.get("screen").width * 0.6,
    marginLeft: Dimensions.get("screen").width * 0.1,
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 50,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "NexaXBold",
  },
  picker: {
    borderColor: "#D4CDE3",
    borderWidth: 2,
    height: 50,
    paddingTop: 15,
    paddingLeft: 15,
    borderRadius: 15,
    marginTop: Dimensions.get("screen").width * 0.02,
    marginBottom: Dimensions.get("screen").width * 0.03,
  },
});
