import React from 'react';
import {Text, Button, View} from 'react-native';

const LoginPage = ({navigation}) => {
  const handleNavigate = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <Text> LoginPage </Text>
      <Button onPress={handleNavigate} title="Sign Up" />
    </View>
  );
};

export default LoginPage;
