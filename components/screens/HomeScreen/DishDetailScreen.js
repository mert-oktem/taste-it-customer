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
          <H1 h1Text="Kamitora" />
          <Text>
            Kamitora represents a seamless integration of the East and the West, a
            fusion of Vancouver with the best of Japanese cuisine.
          </Text>
        </View>
        <View>
          <View>
            <Image />
            <Text style={styles.restaurantAddress}>
              5728 University Blvd #101 V6TIK6
            </Text>
          </View>
          <View>
            <Image />
            <Text style={styles.restaurantAddress}>(604) 718 - 1075</Text>
          </View>
        </View>
        <Button title="Review & Feedback" />
      </ScrollView>
    );
  }
  
};

export default DishDetailScreen;

const styles = StyleSheet.create({});
