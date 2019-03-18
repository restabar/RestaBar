import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'firebase';

class GoogleSignInButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: '',
          isLoggedIn: false,
        };
    }

    componentDidMount() {
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId:
          '903851098197-0jagq02ctqevvd7p31ncdblu3ajs64nq.apps.googleusercontent.com',
      });
    }

    signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
          await GoogleSignin.hasPlayServices();
          const userData = await GoogleSignin.signIn()
            .then((user) => { this.loginWithGoogle(user); });
          console.log('User Info --> ', userData);
          this.setState({ userInfo: userData });
          this.setState({ isLoggedIn: true });
        } catch (error) {
          console.log('Message', error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing In');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play Services Not Available or Outdated');
          } else {
            console.log('Some Other Error Happened');
          }
        }
      };
    
      loginWithGoogle = (user) => {
        console.log('User Info --> ', user);
        const cred = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);   
        console.log(cred);
        firebase.auth().signInAndRetrieveDataWithCredential(cred);
      };
    
      _getCurrentUser = async () => {
        //May be called eg. in the componentDidMount of your main component.
        //This method returns the current user
        //if they already signed in and null otherwise.
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.setState({ userInfo });
        } catch (error) {
          console.error(error);
        }
      };
    
      signOut = async () => {
        //Remove user session from the device.
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remove the user from your app's state as well
          this.setState({ isLoggedIn: false });
        } catch (error) {
          console.error(error);
        }
      };
    
      _revokeAccess = async () => {
        //Remove your application from the user authorized applications.
        try {
          await GoogleSignin.revokeAccess();
          console.log('deleted');
        } catch (error) {
          console.error(error);
        }
      };
    
      signInOrOut = async () => {
          this.state.isLoggedIn ? this.signOut() : this.signIn();
      };
    
      render() {
        return (
          <View style={styles.buttonContainerStyle}>
             <GoogleSigninButton
                style={{ width: 312, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.signInOrOut}
             />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -420,
    marginLeft: 25
  }
});

export default GoogleSignInButton;
