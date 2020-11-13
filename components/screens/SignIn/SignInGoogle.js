import React, { Component } from 'react'
import { View, Text, Button,  StyleSheet} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking'
import * as AuthSession from 'expo-auth-session'
import Constants from "expo-constants"

export default class SignInGoogle extends Component {
    state = {
        authResult: {},
        redirectData: null,
      };
    render() {
        if (this.state.authResult.type && this.state.authResult.type === 'success') {
            return (
              <View style={styles.container}>
                  <Text>{`Hey there, user!`}</Text>
              </View>
            )
          }else if(this.state.authResult.type && this.state.authResult.type === 'cancel'){
            return (
                <View style={styles.container}>
                    <Text>{`Hey there, user!`}</Text>
                </View>
              )   
          }
           else {
            return (
              <View style={styles.container}>
                <Button title="Login with Google" onPress={this.handleOAuthLogin} />
              </View>
            )
          }
        //   {this._maybeRenderRedirectData()}
    }
    handleOAuthLogin = async () => {
        // gets the app's deep link
        let redirectUrl = await Linking.getInitialURL()
        // this should change depending on where the server is running
        let authUrl = `http://localhost:5000/api/customers/login/google`
    this.addLinkingListener()
    try {
       let authResult = await WebBrowser.openAuthSessionAsync(`http://localhost:5000/api/customers/login/google`, redirectUrl)
          await this.setState({ authResult: authResult })
          console.log(authResult)
        } catch (err) {
          console.log('ERROR:', err)
        }
        console.log(this.state.authResult)
    this.removeLinkingListener()
    }
    addLinkingListener = () => {
        Linking.addEventListener('url', this._handleRedirect)
    }
    removeLinkingListener = () => {
        Linking.removeEventListener('url', this._handleRedirect)
    }

    // _maybeRenderRedirectData = () => {
    //     if (!this.state.redirectData) {
    //       return;
    //     }
    
    //     return (
    //       <Text style={{ marginTop: 30 }}>
    //         {JSON.stringify(this.state.redirectData)}
    //       </Text>
    //     );
    //   };
      _handleRedirect = (event) => {
        if (Constants.platform.ios) {
          WebBrowser.dismissBrowser();
        } else {
          this._removeLinkingListener();
        }
    
        let data = Linking.parse(event.url);
    
        this.setState({ redirectData: data });
      };
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
