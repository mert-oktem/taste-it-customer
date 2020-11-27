import React, { useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./components/Context";
import AsyncStorage from "@react-native-community/async-storage";
import { getCustomerAddress } from "./services/api";
import RootGoogle from "./stacks/RootGoogle"
import RootSignIn from "./stacks/RootSignIn"
import RootSignUp from "./stacks/RootSignUp"
import Root from "./stacks/Root"
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };
  const [isExistingUser, setIsExistingUser] = React.useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = React.useState(false);
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
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

  const existedUserHandler = () => {
  
    getCustomerAddress().then((res) => {
      if (res !== undefined) {
        setIsExistingUser(true);
      }
    }),
      (err) => {
        console.log(err);
        setIsExistingUser(false);
      };
    setIsUserLoading(false);
  };
  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        const userToken = foundUser;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          existedUserHandler();
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "LOGIN", token: userToken });
      },
      signInGoogle: async (token, firstName, lastName) => {
        const userToken = token;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          existedUserHandler();
          setIsGoogleLogin(true);
          setFirstName(firstName);
          setLastName(lastName);
        } catch (e) {
          console.log(e);
        }

        dispatch({ type: "LOGIN", token: userToken });
      },
      signOut: async () => {
        try {
          await AsyncStorage.clear();
          setIsExistingUser(false);
          setIsGoogleLogin(false);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (foundUser) => {
        const userToken = foundUser;
        try {
          await AsyncStorage.setItem("userToken", userToken);
          setIsUserLoading(false);
          setIsExistingUser(false);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "REGISTER", token: userToken });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        if (userToken !== null) {
          existedUserHandler();
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 2000);
  }, []);

  const checkUser = () => {
    if (isExistingUser || (isGoogleLogin && isExistingUser)) {
      return <RootSignIn />
    } else if (isGoogleLogin && !isExistingUser) {
      return <RootGoogle />
    } else {
      return <RootSignUp />
    }
  };
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
        {loginState.userToken !== null && isUserLoading !== true
          ? checkUser()
          : <Root />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
