import React from 'react';
import {ActivityIndicator} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage';
import {useSelector} from 'react-redux';
import useUser from './hooks/useUser';
import ProfilePage from './pages/ProfilePage';
import RoomPage from './pages/RoomPage';
import SignOutPage from './pages/SignOutPage';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const Router = () => {
  const {loading} = useUser();
  const currentUser = auth().currentUser;
  const user = useSelector(state => state.user.user);
  if (loading) {
    return <ActivityIndicator size="small" color="darkorange" />;
  }
  const PageHandler = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeHandler"
          component={HomePage}
          options={{title: 'Home', headerShown: false}}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{title: 'Profile', headerShown: false}}
        />
        <Stack.Screen
          name="SignOutPage"
          component={SignOutPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {user === null || currentUser == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={PageHandler}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Room"
            component={RoomPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Router;
