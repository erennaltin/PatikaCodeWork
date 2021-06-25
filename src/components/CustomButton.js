import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({
  title = 'Selam!',
  theme = 'Primary',
  disabled = false,
  loading = false,
  size = 'normal',
  ...props
}) => {
  return (
    <TouchableHighlight
      onPress={disabled ? null : props.onPress}
      underlayColor={
        disabled ? 'rgba(255,255,255, 0)' : 'rgba(255,255,255,0.4)'
      }
      style={[
        styles.container,
        styles[`${size}`],
        disabled ? styles.disabled : styles[`container${theme}`],
      ]}>
      <View>
        {loading ? (
          <ActivityIndicator size="small" color="darkorange" />
        ) : (
          <Text
            style={[
              styles.text,
              disabled ? styles.disabled : styles[`text${theme}`],
            ]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent',
  },
  containerPrimary: {
    borderColor: 'white',
  },
  containerSecondary: {
    borderColor: 'white',
    backgroundColor: 'white',
  },
  containerThird: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  disabled: {
    borderColor: '#ffb733',
    color: '#ffb733',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: 'orange',
  },
  textThird: {
    color: 'white',
  },
  normal: {
    width: '100%',
    marginBottom: 16,
  },
  small: {
    width: '15%',
    marginLeft: 16,
  },
});

export default CustomButton;
