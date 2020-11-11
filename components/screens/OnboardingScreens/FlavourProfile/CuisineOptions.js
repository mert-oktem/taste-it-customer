import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { CheckBox } from "react-native-elements";
import { getCuisine } from "../../../../services/api";
import { Button } from "react-native-paper";

export default class CuisineOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newData:[],
    };
  }

  onchecked(id){
    // console.log(id)
    const data = this.props.cuisines
    const index = data.findIndex(x=>x.id === id)
    data[index].checked = !data[index].checked
    this.setState({
      newData:data
    })
    this.props.updateCuisines(data)
  }
 renderCuisines(){
   return this.props.cuisines.map((item, key)=> {
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
        {this.renderCuisines()}
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
