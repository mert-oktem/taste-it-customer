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

const DishDetailScreen = ({ route, navigation }) => {
  const[orderSelected, setOrderSelected] = React.useState(null)
  const[isLoaded, setIsLoaded] = React.useState(true)
  const { orderID } = route.params;
  useEffect(() => {
    getCustomerActiveOrders().then(
      (res) => {
        for(let i=0; i<res.length;i++){
          if(res[i].orderID === orderID){
            setOrderSelected(res[i])
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
        <Image />
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
        <Button title="Review & Feedback" />
      </ScrollView>
    );
  }
  
};

export default DishDetailScreen;

const styles = StyleSheet.create({});
