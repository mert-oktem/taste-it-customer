import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import H1 from "../../texts/H1";
import RNPickerSelect from 'react-native-picker-select';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";


const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View>
        <View style={styles.center}>
          <View>
            <Image />
            <Text style={styles.title}>Delivery now</Text>
          </View>
          <Text style={styles.address}>5728 University Blvd #101</Text>
        </View>
        <Image />
      </View>
      <View>
        <H1 h1Text="Hi, Mehedi," />
        <Text>Explore your surprise food today.</Text>
        <View>
          <Image />
          <View>
            <Text>Quantity</Text>
            <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '1 Meal', value: '1meal' },
                { label: '2 Meals', value: '2meals' },
                { label: '3 Meals', value: '3meals' },
                { label: '4 Meals', value: '4meals' },
                { label: '5 Meals', value: '5meals' },
            ]}
        />
        </View>
          <View>
            <Text>Budget</Text>
            <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: '$6 to $10', value: '6to10' },
                { label: '$11 to $15', value: '11to15' },
                { label: '$16 to $20', value: '16to20' },
            ]}
        />
          </View>
          <Button title="Order Now" onPress={() => navigation.navigate("OrderConfirmation")} />
          <Button
          title="Sign out"
          
          onPress={() => {
            
            AsyncStorage.clear()
            // navigation.navigate("SignIn")
          }} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },
});
