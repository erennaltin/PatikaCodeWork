import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage.js';
// import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const Router = () => {
  // auth()
  //   .createUserWithEmailAndPassword('eren1@gmail.com', '123456')
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }

  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }

  //     console.error(error);
  //   });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
