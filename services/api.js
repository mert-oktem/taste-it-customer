import { BASE_URL } from '../config/api-config'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


export const getAllergy = async () => {
    const url = `${BASE_URL}/helpers/allergens`
    try {
  
      const res = await axios.get(url)
      const allergies = res.data
  
      return allergies
    } catch (err) {
      throw err
    } 
  }
  export const getCuisine = async () => {
    const url = `${BASE_URL}/helpers/cuisines`
    try {
  
      const res = await axios.get(url)
      const cuisines = res.data
  
      return cuisines
    } catch (err) {
      throw err
    } 
  }
  export const getDietType = async () => {
    const url = `${BASE_URL}/helpers/dietTypes`
    try {
  
      const res = await axios.get(url)
      const dietTypes = res.data
  
      return dietTypes
    } catch (err) {
      throw err
    } 
  }
  export const getSpiciness = async () => {
    const url = `${BASE_URL}/helpers/spiciness`
    try {
  
      const res = await axios.get(url)
      const spiciness = res.data
  
      return spiciness
    } catch (err) {
      throw err
    } 
  }
  export const postChoice = async (choice) => {
    let token = null;
    token = await AsyncStorage.getItem("userToken");
    const body = {"choiceName": `${choice}`}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
    const url = `${BASE_URL}/customers/choice`
    try {
  
      const res = await axios.post(url, body,  {
        headers: headers
      })
      const choiceData = res.data
      return choiceData
    } catch (err) {
      throw err
    } 
  }
