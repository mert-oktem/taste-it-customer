import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import H1 from "../../texts/H1";

const DishDetailScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Image />
      <View>
        <Text>Your dish was</Text>
        <H1 h1Text="Japanese Tsukemen" />
        <Text>
          Tsukemen () is one of the most beloved styles of ramen in Japan,
          especially during the summer months. The dish involves serving cold
          noodles alongside a bowl of hot soup.
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
};

export default DishDetailScreen;

const styles = StyleSheet.create({});
