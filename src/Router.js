import React from 'react';
import {ActivityIndicator} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './pages/HomePage';
import {useSelector} from 'react-redux';
import useUser from './hooks/useUser';
import ProfilePage from './pages/ProfilePage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  const user = useSelector(state => state.user.user);
  const {loading} = useUser();

  if (loading) {
    return <ActivityIndicator size="small" color="darkorange" />;
  }

  return (
    <NavigationContainer>
      {user === null ? (
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
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="ProfilePage" component={ProfilePage} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Router;
