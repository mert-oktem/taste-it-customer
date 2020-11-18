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
import {putReviewOrder} from "../../../services/api"
import { CheckBox } from "react-native-elements";
import H1 from "../../texts/H1";

export default function ReviewRating({ route, navigation }) {
  const [rating, setRating] = React.useState(null);
  const [comment, setComment] = React.useState(null);
  const [isOrderAgain, setIsOrderAgain] = React.useState(false)
  const { orderID } = route.params
  
  const textInputCommentChange = (val) => {
    setComment(val);
  };
  const textInputRatingChange = (val) => {
    setRating(val);
  };
  const reviewHandler = () => {
    //   console.log("done")
      putReviewOrder(orderID, rating, comment, isOrderAgain).then(
          (res) => {
              
              alert("review saved")
              navigation.navigate("ThanksFeedback")
          }, (err) =>{
              console.log(err)
              Alert.alert("Error", `Something went wrong! ${err}`);
          }
      )
  };
 
  return (
    <ScrollView>
      <View>
        <H1 h1Text="Rating & Review" />
        <Text>Rate your experince and leave a comment to help us improve.</Text>
      </View>
      <View>
        <Text>Rate for Service</Text>
        <View>
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
      <View>
        <Text>Comments</Text>
        <TextInput
          placeholder={"Comments..."}
          multiline={true}
          autoCapitalize="none"
          onChangeText={(val) => textInputCommentChange(val)}
          numberOfLines={3}
        ></TextInput>
        <CheckBox 
         key= {orderID}
         onPress={() => setIsOrderAgain(!isOrderAgain)}
         checked={isOrderAgain}
         title="Would you like to reorder this meal?"
         />
         <Text>By clicking the checkbox, this dish will automatically be added in your next order</Text>
        <Button title="Submit"
         type="submit"
         onPress={reviewHandler} />
      </View>

    </ScrollView>
  );
}
