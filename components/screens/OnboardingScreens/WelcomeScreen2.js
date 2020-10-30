import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import ReusableBtn from "../../buttons/ReusableBtn";
import AsyncStorage from "@react-native-community/async-storage";

const WelcomeScreen2 = ({ navigation }) => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [items, setItems] = React.useState(null);

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        setIsLoading(false);
        setUserToken(userToken);
        let response = await fetch("http://localhost:5000/api/customers/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `${userToken}`,
          },
        
        });
  
        const res = await response.json();
        // console.log(res.firstName);
  
        if (response.status >= 200 && response.status < 300) {
          setItems(res.firstName);
          // Alert.alert("User Info displayed", "Thank you", [{ text: "Ok" }]);
        } else {
          Alert.alert("Invalid Input!", "Something went wrong, Try again", [
            { text: "Okay" },
          ]);
          //Handle error
          let error = res;
          throw error;
        }
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
    




    }, 1000);
    
  }, []);
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // console.log(items)
  return (
    <ScrollView>
      <Image style={styles.image} />
      <View style={styles.page}>
  <Text style={styles.text1}>Hi {items}</Text>
        <Text style={styles.heading}>Welcome Aboard!</Text>
        <Text style={styles.text2}>
          Ready for your new food experiences? Discover your next favourite food
          through mystery dishes, customized just for you.
        </Text>

        <Button
          title="Create Flavour Profile"
          onPress={() => navigation.navigate("FlavourProfile")}
        />
        <Button
          title="Sign out"
          
          onPress={() => {
            
            AsyncStorage.clear()
            navigation.navigate("SignIn")
          }}
          
        />
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    backgroundColor: "lightgray",
    marginTop: Dimensions.get("screen").width * 0.15,
  },
  page: {
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    marginTop: 30,
  },
  text1: {
    fontSize: 16,
  },
  text2: {
    marginBottom: 15,
    fontSize: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 40,
  },
});
