import React from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { putReviewOrder } from "../../../services/api";
import { CheckBox } from "react-native-elements";
import H1 from "../../texts/H1";
import { useFonts } from "expo-font";

export default function ReviewRating({ route, navigation }) {
  const [rating, setRating] = React.useState(null);
  const [comment, setComment] = React.useState(null);
  const [isOrderAgain, setIsOrderAgain] = React.useState(false);
  const { orderID } = route.params;
  const [fontsLoaded] = useFonts({
    NexaRegular: require("../../../assets/NexaFont/NexaRegular.otf"),
    NexaXBold: require("../../../assets/NexaFont/NexaXBold.otf"),
  });

  const textInputCommentChange = (val) => {
    setComment(val);
  };
  const textInputRatingChange = (val) => {
    console.log(val);
    setRating(val);
  };
  const reviewHandler = () => {
    //   console.log("done")
    putReviewOrder(orderID, rating, comment, isOrderAgain).then(
      (res) => {
        alert("review saved");
        navigation.navigate("ThanksFeedback");
      },
      (err) => {
        console.log(err);
        Alert.alert("Error", `Something went wrong! ${err}`);
      }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: Dimensions.get("screen").width * 0.8,
          marginLeft: Dimensions.get("screen").width * 0.1,
          marginTop: Dimensions.get("screen").width * 0.1,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "NexaXBold",
              fontSize: 32,
              color: "#632df1",
              lineHeight: 39,
              // fontWeight: "extraBold",
            }}
          >
            Rating & Review
          </Text>
          <Text
            style={{
              fontFamily: "NexaRegular",
              fontSize: 16,
              color: "#3e315a",
              lineHeight: 24,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            Rate your experince and leave a comment to help us improve.
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "NexaXBold",
              fontSize: 16,
              lineHeight: 19,
              color: "#3e315a",
              marginBottom: 20,
            }}
          >
            Rate for Service
          </Text>
          <View
            style={{
              width: Dimensions.get("screen").width * 0.8,
              height: 50,
              borderWidth: 2,
              borderColor: "#D4CDE3",
              borderRadius: 15,
              paddingTop: 14,
              paddingLeft: 8,
            }}
          >
            <RNPickerSelect
              placeholder={{ label: "Rating" }}
              onValueChange={(value) => textInputRatingChange(value)}
              items={[
                { label: "1 Star", value: "1" },
                { label: "2 Star", value: "2" },
                { label: "3 Star", value: "3" },
                { label: "4 Star", value: "4" },
                { label: "5 Star", value: "5" },
              ]}
            />
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "NexaXBold",
              fontSize: 16,
              lineHeight: 19,
              color: "#3e315a",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Comments
          </Text>
          <TextInput
            multiline={true}
            autoCapitalize="none"
            onChangeText={(val) => textInputCommentChange(val)}
            numberOfLines={3}
            style={{
              height: 200,
              width: Dimensions.get("screen").width * 0.8,
              color: "#3e315a",
              padding: 10,
              borderWidth: 2,
              borderColor: "#D4CDE3",
              borderRadius: 15,
            }}
          ></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <CheckBox
            key={orderID}
            onPress={() => setIsOrderAgain(!isOrderAgain)}
            checked={isOrderAgain}
            center={true}
            checkedColor="#3e315a"
            uncheckedColor="#d4cde3"
            checkedIcon="check-square"
            uncheckedIcon="square"
            containerStyle={[
              {
                marginLeft: -Dimensions.get("screen").width * 0.001,
                padding: 0,
                borderWidth: 0,
                backgroundColor: "white",
              },
            ]}
          />
          <Text
            style={{
              fontFamily: "NexaXBold",
              fontSize: 16,
              color: "#3e315a",
              marginTop: 5,
            }}
          >
            Would you like to reorder this meal?
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "NexaRegular",
            fontSize: 12,
            lineHeight: 16.5,
            color: "#3e315a",
          }}
        >
          By clicking the checkbox, this dish will automatically be added in
          your next order
        </Text>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={reviewHandler}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#632DF1",
    paddingTop: 17.5,
    paddingBottom: 17.5,
    borderRadius: 16,
    marginBottom: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "NexaXBold",
    fontSize: 16,
    fontWeight: "bold",
  },
});
