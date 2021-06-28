import React, {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {View, Image, StyleSheet, Text} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CustomButton from './CustomButton';

const ImageInput = props => {
  const username = auth().currentUser.displayName;
  const [loading, setLoading] = useState(false);
  const [isChosen, setChosen] = useState(false);
  const [imageSource, setSource] = useState(require('../static/user.png'));
  const [error, setError] = useState('');

  let options = {
    mediaType: 'photo',
    includeBase64: true,
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = database()
      .ref(`UserPhotos/${username}`)
      .once('value')
      .then(data => {
        setSource(data.val().photoURL);
        props.setProfileLoading(false);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });

    return () => {
      props.setProfileLoading(false);
      setLoading(false);
      return unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const choosePhoto = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel || response.error || response.customButton) {
        null;
      } else {
        props.setProfileLoading(true);
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        setSource(source);
        setChosen(true);
      }
    });
  };

  const uploadProfilePicture = async () => {
    props.setProfileLoading(false);

    database().ref(`UserPhotos/${username}`).set({
      photoURL: imageSource,
    });
  };

  return (
    <View style={styles.container}>
      {error ? <Text> Error </Text> : null}
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.usernameText}> {username} </Text>
      <CustomButton
        onPress={choosePhoto}
        theme="Third"
        title="Choose a Photo"
        disabled={loading}
      />
      <CustomButton
        onPress={uploadProfilePicture}
        theme="Secondary"
        title="Upload the Photo"
        disabled={!isChosen}
      />
    </View>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameText: {
    color: 'orange',
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    borderColor: 'orange',
    marginTop: 16,
    marginBottom: 64,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 999,
    borderColor: 'darkorange',
    borderWidth: 2,
  },
});
