// SignUp.js
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageInput = ({roomId}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const signUpValidationSchema = yup.object().shape({
    message: yup.string().required('Please enter a message!'),
  });
  const reference = database().ref(`/Rooms/${roomId}/messages`);
  const user = auth().currentUser;
  const sendIcon = <Icon name="send" size={20} color="#ffa500" />;

  const setNewMessageFirebase = values => {
    setLoading(true);
    reference
      .push({
        message: values.message,
        user: user.displayName,
        date: new Date().getTime(),
      })
      .then(data => {
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Formik
          validateOnMount
          validationSchema={signUpValidationSchema}
          initialValues={{
            message: '',
          }}
          onSubmit={values => {
            setNewMessageFirebase(values);
          }}>
          {({handleSubmit, isValid, resetForm}) => (
            <View style={styles.form}>
              <Field
                component={CustomInput}
                name="message"
                theme="Secondary"
                placeholder="Write Your Message here!"
              />
              <CustomButton
                style={styles.customButton}
                onPress={handleSubmit}
                resetForm={resetForm}
                title={sendIcon}
                disabled={!isValid}
                theme="Third"
                size="small"
                loading={loading}
              />
              {error && <Text style={styles.error}> {error} </Text>}
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 3,
    borderColor: 'rgba(255, 165, 0,0.5)',
    backgroundColor: 'white',
  },
  form: {
    width: '120%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    textAlign: 'center',
    padding: 4,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 24,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 128,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
