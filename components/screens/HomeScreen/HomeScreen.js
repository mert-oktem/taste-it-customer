import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.center}>
        <View>
          <Image />
          <Text style={styles.title}>Delivery now</Text>
        </View>
        <Text style={styles.address}></Text>
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
