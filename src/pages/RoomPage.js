import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Message from '../components/Message';

const messages = [1, 2, {theme: 'Secondary'}, 4, 5, 6, 7, 8, 9, 10, 11];

const introduction = props => {
  return (
    <Text style={styles.createdText}>
      {props.route.params.roomName} has been created!
    </Text>
  );
};

const RoomPage = props => {
  return (
    <View style={styles.container}>
      <Header title={props.route.params.roomName} />
      <FlatList
        style={styles.messageContainer}
        ListHeaderComponent={introduction(props)}
        data={messages}
        keyExtractor={item => item}
        renderItem={({item}) => <Message theme={item.theme} />}
      />
    </View>
  );
};

export default RoomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  messageContainer: {
    width: '90%',
  },
  createdText: {
    color: 'orange',
    borderWidth: 3,
    borderColor: 'orange',
    textAlign: 'center',
    marginTop: 8,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 'bold',
    fontSize: 16,
    borderStyle: 'dashed',
  },
});
