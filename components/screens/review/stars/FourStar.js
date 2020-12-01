import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const FourStar = () => {
  return (
    <View style={styles.starsRow}>
      <Image
        style={styles.starImg}
        source={require("../../../../assets/Icons/rated.png")}
      />
      <Image
        style={styles.starImg}
        source={require("../../../../assets/Icons/rated.png")}
      />
      <Image
        style={styles.starImg}
        source={require("../../../../assets/Icons/rated.png")}
      />
      <Image
        style={styles.starImg}
        source={require("../../../../assets/Icons/rated.png")}
      />
      <Image
        style={styles.starImg}
        source={require("../../../../assets/Icons/rate.png")}
      />
    </View>
  );
};

export default FourStar;

const styles = StyleSheet.create({
  starsRow: {
    display: "flex",
    flexDirection: "row",
    maxWidth: Dimensions.get("screen").width * 0.7,
    // marginLeft: Dimensions.get("screen").width * 0.05,
    marginBottom: 30,
    justifyContent: "space-around",
  },
  starImg: {
    maxWidth: 28,
    maxHeight: 26,
  },
});
