import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import firebase from 'firebase';
import GoogleSignInButton from './google/GoogleSignInButton';
import FacebookSignInButton from './facebook/FacebookSignInButton';

export const LOGO = require('./image/restabarLogo.png'); 

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: '',
          isLoggedIn: false,
          logoUrl: ''
        };
    
        firebase.initializeApp({
            apiKey: 'AIzaSyB_WYCY2h3kRkwyCaW4PwuXfAvmVz0y5WM',
            authDomain: 'restabar-dc6df.firebaseapp.com',
            databaseURL: 'https://restabar-dc6df.firebaseio.com',
            projectId: 'restabar-dc6df',
            storageBucket: 'restabar-dc6df.appspot.com',
            messagingSenderId: '903851098197'
        });
      }
         
      render() {
        return (
            <View>
                <View style={styles.logo}>
                  <Image source={LOGO} />
                </View>
                <FacebookSignInButton />
                <GoogleSignInButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
      position: 'absolute',
      bottom: -200,
      alignItems: 'center',
      top: 20,
      marginLeft: 80
    }
});

export default App;
