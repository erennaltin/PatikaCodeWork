// SignUp.js
import React, {useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {Formik, Field} from 'formik';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {SET_USER} from '../store/actions';

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const signUpValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(0)(\d){10}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  });

  const signUpFirebase = async values => {
    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      const updatedUser = await auth().currentUser.updateProfile({
        displayName: values.username,
        username: values.username,
        phoneNumber: values.phoneNumber,
      });
      console.log(updatedUser);

      dispatch(SET_USER(updatedUser));
    } catch (err) {
      setError(err.message.split(']')[1]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to onboard!</Text>
        <Formik
          validateOnMount
          validationSchema={signUpValidationSchema}
          initialValues={{
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={values => signUpFirebase(values)}>
          {({handleSubmit, isValid}) => (
            <View style={styles.form}>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Field
                component={CustomInput}
                name="username"
                placeholder="Username"
              />
              <Field
                component={CustomInput}
                name="phoneNumber"
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <Field
                component={CustomInput}
                name="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />
              <CustomButton
                onPress={handleSubmit}
                title="Submit"
                disabled={!isValid}
                theme="Secondary"
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  form: {
    width: '80%',
  },
  title: {
    textAlign: 'center',
    padding: 4,
    color: 'white',
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
