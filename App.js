import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import SignIn from "./components/screens/signIn/SignIn";
import SignUp from "./components/screens/signUp/SignUp";
import DeliveryInfo from "./components/screens/onboardingScreens/DeliveryInfo";
import Home from "./components/screens/home/Home";
import WelcomeScreen from "./components/screens/welcomeScreen/WelcomeScreen";
import WelcomeScreen2 from "./components/screens/onboardingScreens/WelcomeScreen2";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllergyOptions from "./components/screens/onboardingScreens/flavourProfile/AllergyOptions";
import FlavourProfile from "./components/screens/onboardingScreens/flavourProfile/FlavourProfile";
import { AuthContext } from "./components/Context";
import AsyncStorage from "@react-native-community/async-storage";
import RootStack from "./components/RootStack";

const Stack = createStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);

        const userToken = foundUser;
        
       
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log("user token: ", userToken);
        dispatch({ type: "LOGIN", token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);

        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (foundUser) => {
        const userToken = foundUser;
        
        
        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log("user token: ", userToken);
        dispatch({ type: "REGISTER", token: userToken });
      },
      // toggleTheme: () => {
      //   setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      // },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
    // setIsLoading(false);},1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator style={styles.container}>
            <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
            <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen} />
            
            <Stack.Screen name="DeliveryInfo1" component={DeliveryInfo} />
            <Stack.Screen name="FlavourProfile" component={FlavourProfile} />
            
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
