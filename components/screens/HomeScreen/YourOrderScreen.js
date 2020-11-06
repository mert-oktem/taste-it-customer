import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import H1 from "../../texts/H1";

const YourOrderScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <H1 h1Text="Your Orders" />
        <Text>Reveal what's inside your food box</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("DishDetailScreen")}>
        <View>
          <Image />
          <View>
            <Text>Awaits to be revealed</Text>
            <Text>Click to reveal</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("DishDetailsScreen")}
      >
        <View>
          <Image />
          <View>
            <Text>Japanese Tsukemen</Text>
            <View>
              <Image />
              <Text>Kamitora</Text>
            </View>
            <View>
              <Image />
              <Text>$14.50</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default YourOrderScreen;

const styles = StyleSheet.create({});
