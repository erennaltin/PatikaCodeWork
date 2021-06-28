import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LOG_OUT} from '../store/actions';
import {useDispatch} from 'react-redux';

const SignOutPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const signOut = async () => {
    const outUser = await auth().signOut();
    dispatch(LOG_OUT());
    setLoading(false);
    return outUser;
  };

  useEffect(() => {
    setTimeout(() => signOut(), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text> Signing Out! </Text>
      {loading ? <ActivityIndicator color="orange" size="large" /> : null}
    </View>
  );
};

export default SignOutPage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
