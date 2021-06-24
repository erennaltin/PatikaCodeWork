import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {SET_USER} from '../store/actions';

const LoginPage = props => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const loginFirebase = (email, password) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        dispatch(SET_USER(userCredential));
        setLoading(false);
        // ...
      })
      .catch(errorLogin => {
        setError(errorLogin.message.split(']')[1]);
        setLoading(false);
      });
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Text style={styles.title}> codeworks </Text>
        <Formik
          validateOnMount
          validationSchema={loginValidationSchema}
          initialValues={{username: '', password: ''}}
          onSubmit={values => loginFirebase(values.email, values.password)}>
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
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <CustomButton
                onPress={handleSubmit}
                title="Submit"
                disabled={!isValid}
                loading={loading}
              />
              <CustomButton
                theme="Secondary"
                title="Sign Up"
                onPress={() => props.navigation.navigate('SignUp')}
              />
              {error && <Text style={styles.error}> {error} </Text>}
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'orange',
  },
  form: {
    position: 'absolute',
    width: '80%',
    bottom: '10%',
  },
  title: {
    position: 'absolute',
    top: '20%',
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
