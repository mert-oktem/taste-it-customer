import { BASE_URL } from '../config/api-config'
import axios from 'axios'


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

