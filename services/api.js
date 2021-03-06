import { BASE_URL } from "../config/api-config";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

// *********************  Get *****************************//
export const getAllergy = async () => {
  const url = `${BASE_URL}/helpers/allergens`;
  try {
    const res = await axios.get(url);
    const allergies = res.data;

    return allergies;
  } catch (err) {
    throw err;
  }
};
export const getCuisine = async () => {
  const url = `${BASE_URL}/helpers/cuisines`;
  try {
    const res = await axios.get(url);
    const cuisines = res.data;

    return cuisines;
  } catch (err) {
    throw err;
  }
};
export const getDietType = async () => {
  const url = `${BASE_URL}/helpers/dietTypes`;
  try {
    const res = await axios.get(url);
    const dietTypes = res.data;

    return dietTypes;
  } catch (err) {
    throw err;
  }
};
export const getSpiciness = async () => {
  const url = `${BASE_URL}/helpers/spiciness`;
  try {
    const res = await axios.get(url);
    const spiciness = res.data;

    return spiciness;
  } catch (err) {
    throw err;
  }
};
export const getCountries = async () => {
  const url = `${BASE_URL}/helpers/countries`;
  try {
    const res = await axios.get(url);
    const response = res.data;

    return response;
  } catch (err) {
    throw err;
  }
};
export const getProvinces = async () => {
  const url = `${BASE_URL}/helpers/provinces`;
  try {
    const res = await axios.get(url);
    const response = res.data;

    return response;
  } catch (err) {
    throw err;
  }
};

export const getCities = async () => {
  const url = `${BASE_URL}/helpers/cities`;
  try {
    const res = await axios.get(url);
    const response = res.data;

    return response;
  } catch (err) {
    throw err;
  }
};

export const getCustomerInfo = async (source) => {
  const url = `${BASE_URL}/customers/`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.get(url, {
      cancelToken: source.token,
      headers: {
        Authorization: `${token}`,
      },
    });
    const customer = res.data;
    return customer;
  } catch (error) {
    throw error;
  }
};
export const getDeactivateChoices = async () => {
  const url = `${BASE_URL}/customers/deactivechoices`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const getCustomerAddress = async () => {
  const url = `${BASE_URL}/customers/address`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const customer = res.data[0];
    return customer;
  } catch (err) {
    throw err;
  }
};
export const getCustomerChoices = async () => {
  const url = `${BASE_URL}/customers/choices`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const choices = res.data;
    return choices;
  } catch (err) {
    throw err;
  }
};

export const getCustomerActiveOrders = async (source) => {
  const url = `${BASE_URL}/orders/customer`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.get(url, {
      cancelToken: source.token,
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

// *********************  Post *****************************//

export const postCustomerLoginInfo = async (email, password) => {
  const url = `${BASE_URL}/customers/login`;
  const body = {
    email: `${email}`,
    password: `${password}`,
  };
  try {
    const res = await axios.post(url, body);
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};
export const postCustomerInfo = async (
  email,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  const url = `${BASE_URL}/customers`;
  const body = {
    email: `${email}`,
    password: `${password}`,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    phoneNumber: `${phoneNumber}`,
  };
  try {
    const res = await axios.post(url, body);
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const postDeliveryInfo = async (
  countryName,
  provinceName,
  cityName,
  address,
  postcode,
  instructions
) => {
  const url = `${BASE_URL}/customers/address`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    countryName: `${countryName}`,
    provinceName: `${provinceName}`,
    cityName: `${cityName}`,
    address: `${address}`,
    postcode: `${postcode}`,
    instructions: `${instructions}`,
  };
  try {
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const postGoogleEmail = async (email) => {
  const url = `${BASE_URL}/customers/create/google`;
  const body = {
    email: `${email}`,
  };
  try {
    const res = await axios.post(url, body);
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const getDeliveryTime = async (restaurantID, source) => {
  const url = `${BASE_URL}/orders/deliveryTime`;
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  try {
    const res = await axios.post(
      url,
      { restaurantID: `${restaurantID}` },
      {
        cancelToken: source.token,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const time = res.data;
    return time;
  } catch (err) {
    throw err;
  }
};

export const getSuitableMenu = async (noOfPeople, budget) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = { budget: `${budget}`, noOfPeople: `${noOfPeople}` };
  const url = `${BASE_URL}/orders/pickMenu`;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });

    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};
export const getSubmitOrder = async (menuID) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = { menuID: `${menuID}` };
  const url = `${BASE_URL}/orders`;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });

    const res = await response;
    return res;
  } catch (err) {
    throw err;
  }
};

export const postChoice = async (choice) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = { choiceName: `${choice}` };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const url = `${BASE_URL}/customers/choice`;
  try {
    const res = await axios.post(url, body, {
      headers: headers,
    });
    const choiceData = res.data;
    return choiceData;
  } catch (err) {
    throw err;
  }
};

export const postCustomerInquiry = async (
  email,
  name,
  subject,
  message,
  phoneNumber
) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    email: `${email}`,
    name: `${name}`,
    subject: `${subject}`,
    body: `${message}`,
    phoneNumber: `${phoneNumber}`,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const url = `${BASE_URL}/inquiries`;
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
    const res = await response.json();
    return res;
  } catch (err) {
    throw err;
  }
};

// *********************  Put *****************************//

export const putDeliveryInfo = async (
  countryName,
  provinceName,
  cityName,
  address,
  postcode,
  instructions
) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    countryName: `${countryName}`,
    provinceName: `${provinceName}`,
    cityName: `${cityName}`,
    address: `${address}`,
    postcode: `${postcode}`,
    instructions: `${instructions}`,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const url = `${BASE_URL}/customers/address`;
  try {
    const res = await axios.put(url, body, {
      headers: headers,
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const putCustomerInfo = async (
  email,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    email: `${email}`,
    password: `${password}`,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    phoneNumber: `${phoneNumber}`,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const url = `${BASE_URL}/customers`;
  try {
    const res = await axios.put(url, body, {
      headers: headers,
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};
export const putGoogleCustomerInfo = async (
  firstName,
  lastName,
  phoneNumber
) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    phoneNumber: `${phoneNumber}`,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const url = `${BASE_URL}/customers`;
  try {
    const res = await axios.put(url, body, {
      headers: headers,
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};

export const putReviewOrder = async (orderID, rate, review, isOrderAgain) => {
  let token = null;
  token = await AsyncStorage.getItem("userToken");
  const body = {
    orderID: `${orderID}`,
    rate: `${rate}`,
    review: `${review}`,
    isOrderAgain: `${isOrderAgain}`,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const url = `${BASE_URL}/orders`;
  try {
    const res = await axios.put(url, body, {
      headers: headers,
    });
    const response = res.data;
    return response;
  } catch (err) {
    throw err;
  }
};
