import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

export default class FacebookSignInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: '',
          isLoggedIn: false,
        };
    }
  render() {
    return (
      <View style={styles.buttonContainerStyle}>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          style={{ width: 306, height: 48 }}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString());
                    const cred = firebase.auth.FacebookAuthProvider.credential(data.accessToken.toString());
                    console.log(cred);
                    firebase.auth().signInAndRetrieveDataWithCredential(cred);
                  }
                );
              }
            }
          }
          onLogoutFinished={() => console.log('logout.')} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
buttonContainerStyle: {
position: 'absolute',
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
bottom: -380,
marginLeft: 28
}
});
