// CustomInput.js
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;
  let theme = props.theme;
  if (theme === undefined) {
    theme = 'Primary';
  }
  const hasError = errors[name] && touched[name];

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={
          theme === 'Primary'
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(255, 165, 0,0.5)'
        }
        style={[
          styles.textInput,
          styles[`textInput${theme}`],
          hasError && styles.errorInput,
        ]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          if (value) {
            setFieldTouched(name);
          }
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && value !== '' && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textInput: {
    height: 40,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
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
  textInputPrimary: {
    width: '100%',
    borderColor: 'white',
    color: 'white',
  },
  textInputSecondary: {
    width: '130%',
    borderColor: 'orange',
    color: 'orange',
  },
});

export default CustomInput;
