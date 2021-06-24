// CustomInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="rgba(255,255,255,0.4)"
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textInput: {
    height: 40,
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderBottomWidth: 2,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'orangered',
  },
  errorInput: {
    borderColor: 'orangered',
  },
});

export default CustomInput;
