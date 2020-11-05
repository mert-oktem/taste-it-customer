import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions,Alert} from "react-native";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { getSpiciness } from "../../../../services/api";

export default class SpicinessOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData:[],
    };
  }
  onchecked(id){
    // console.log(id)
    const data = this.props.spiciness
    const index = data.findIndex(x=>x.id === id)
    data[index].checked = !data[index].checked
    this.setState({
      newData:data
    })
    this.props.updateSpiciness(data)
  }
 renderSpiciness(){
  
   return this.props.spiciness.map((item, key)=> {
     return (
         <CheckBox 
         key= {item.id}
         onPress={()=>{this.onchecked(item.id)}}
         checked={item.checked}
         title={item.key}
         />
     )
   })
 }
  render() {
    return (
      <View style={styles.options}>
        {this.renderSpiciness()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  options: {
    marginTop: 50,
    width: Dimensions.get("screen").width * 0.8,
    marginLeft: Dimensions.get("screen").width * 0.1,
    backgroundColor: "white",
  },
});
