import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions,Alert} from "react-native";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { getAllergy } from "../../../../services/api";

export default class AllergyOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      data:[],
      isLoaded: true,
      selectedData:[]
    };
  }
  componentDidMount() {
    getAllergy().then(
      (res) => {
        this.setState({
          data: res,
          isLoaded: false,
        });
        let needData =[]
        for(let i=0;i<res.length;i++){
          needData.push(
            {
              id:i,
              key:res[i].choiceDescription,
              checked:false
            }
          )
        }
        this.setState({
          data:needData
        })
        console.log(this.state.data);
      },
      (error) => {
        alert("Error", `Something went wrong! ${error}`);
      }
    );
  }
  onchecked(id){
    const data = this.state.data
    const index = data.findIndex(x=>x.id === id)
    data[index].checked = !data[index].checked
    this.setState(data)
  }
 renderAllergies(){
   return this.state.data.map((item, key)=> {
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
 getSelectedAllergies(){
    const keys = this.state.data.map((k) => k.key)
    var checks = this.state.data.map((k) => k.checked)
    let Selected = []
    for(let i=0;i<checks.length;i++){
      if(checks[i] == true){
        Selected.push(keys[i])
      }
    }
    alert(Selected)
 }
  render() {
    return (
      <View style={styles.options}>
        {this.renderAllergies()}
        
        
        <Button full onPress = {()=>{this.getSelectedAllergies()}}>
          <Text>Check data </Text>
        </Button>
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
