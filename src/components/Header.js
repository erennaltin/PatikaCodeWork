import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Header = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}> {props.title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 3,
    borderColor: 'rgba(255, 165, 0,0.5)',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'orange',
    fontSize: 24,
  },
});

export default Header;
