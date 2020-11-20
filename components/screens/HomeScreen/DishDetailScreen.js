import React, { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View, ActivityIndicator
} from "react-native";
import H1 from "../../texts/H1";
import {getCustomerActiveOrders} from "../../../services/api"
import Footer from "../../footer/Footer";

const DishDetailScreen = ({ route, navigation }) => {
  const[orderSelected, setOrderSelected] = React.useState(null)
  const[isLoaded, setIsLoaded] = React.useState(true)
  const { orderID } = route.params;
  const[imageUrl, setImageUrl] = React.useState(null)
  const[menuID, setMenuID] = React.useState(null)
  // console.log(navigation)

  useEffect(() => {
    getCustomerActiveOrders().then(
      (res) => {
        for(let i=0; i<res.length;i++){
          if(res[i].orderID === orderID){
            setOrderSelected(res[i])
            setMenuID(res[i].menuID)
           let newMenuID = res[i].menuID
            if(res[i].menuID > 20){
              newMenuID = 20
            }
            let url = `http://localhost:5000/api/menus/image/${newMenuID}`
            setImageUrl(url)
            setIsLoaded(false)
          }
        }
      }
    ), (err) => {
      console.log(err)
    }
   
  }, [])
  if (isLoaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <ScrollView>
        <Image
          style = {{ width: 200, height: 200}}
          source={{uri: `${imageUrl}`}}
        />
        <View>
          <Text>Your dish was</Text>
          <H1 h1Text={orderSelected.menuName} />
          <Text>
            {orderSelected.menuDescription}
          </Text>
        </View>
        <View>
          <Text>Served by</Text>
          <H1 h1Text={orderSelected.restaurantName} />
          <Text>
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
    <Text style={styles.restaurantAddress}>{orderSelected.phoneNumber}</Text>
          </View>
        </View>
        <Button title="Review & Feedback"
        //  type="submit"
         onPress={() => navigation.navigate("ReviewRating", {orderID: orderID})} />
        {/* <Footer /> */}
      </ScrollView>
    );
  }
  
};

export default DishDetailScreen;

const styles = StyleSheet.create({});
