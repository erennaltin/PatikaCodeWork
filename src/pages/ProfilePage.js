import React from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {LOG_OUT} from '../store/actions';

const ProfilePage = props => {
  const dispatch = useDispatch();
  const signOut = () => {
    auth().signOut();
    dispatch(LOG_OUT());
  };

  return (
    <View>
      <Text> Selam! Profile </Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default ProfilePage;
