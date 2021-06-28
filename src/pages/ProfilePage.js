import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import ImageInput from '../components/ImageInput';
import CustomButton from '../components/CustomButton';

const ProfilePage = props => {
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    console.log(profileLoading);
  }, [profileLoading]);
  const signOut = () => {
    props.navigation.navigate('SignOutPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <ImageInput setProfileLoading={setProfileLoading} />
        <CustomButton
          onPress={signOut}
          theme="Third"
          title="Sign Out"
          disabled={profileLoading}
        />
      </View>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
