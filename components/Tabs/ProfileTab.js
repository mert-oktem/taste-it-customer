import React, {useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCustomerInfo} from "../../services/api"
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "../Context";



const ProfileTab = (props) => {

  const { signOut } = React.useContext(AuthContext);
  const [firstName, setFirstName] = React.useState(null);
  const [value,setValue] = React.useState();
//   const refresh = ()=>{
//     // it re-renders the component
//    setValue({});
// }
useEffect(() => {
  getCustomerInfo().then(
    (res) => {
      setFirstName(res.firstName);
    },
    (err) => {
      console.log(err);
    }
  );
  
},[]);

  return (
    <ScrollView >
    <View>
  <Text >Hi, {firstName}</Text>
      <Image />
    </View>
    <TouchableOpacity onPress={props.onHandleCustomerChange}>
      <Image />
      <Text>Account Profile</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onHandleDeliveryChange}>
      <Image />
      <Text>Delivery Information</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onHandleFlavourChange}>
      <Image />
      <Text>Flavour Profile</Text>
    </TouchableOpacity>
    <Button
            title="Sign out"
            onPress={() => {
              // AsyncStorage.clear();
              signOut()
              // navigation.navigate("SignIn")
            }}
          />
  </ScrollView>

  )
}
  

export default ProfileTab;

export const styles = StyleSheet.create({
    center: {
      flex: 1,
      margin: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 36,
      marginBottom: 16
    }
  });