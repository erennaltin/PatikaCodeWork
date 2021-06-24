import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import Header from '../components/Header';

const rooms = [
  {roomName: 'JavaScript', userCounter: 456},
  {roomName: 'Python', userCounter: 1231231},
  {roomName: 'Java', userCounter: 423},
  {roomName: 'What is Patika.dev?', userCounter: 423},
  {roomName: 'Deneme', userCounter: 456},
  {roomName: 'Deneme2', userCounter: 1231231},
  {roomName: 'Deneme3', userCounter: 423},
  {roomName: 'Denem4', userCounter: 423},
  {roomName: 'Dem12', userCounter: 456},
  {roomName: 'asdmasl', userCounter: 1231231},
  {roomName: 'Javaasdas', userCounter: 423},
  {roomName: 'What is Pasdasatika.dev?', userCounter: 423},
  {roomName: 'JavaScriptasasd', userCounter: 456},
  {roomName: 'Pythoasdasdn', userCounter: 1231231},
  {roomName: 'Javaasd', userCounter: 423},
  {roomName: 'What isasdasdas Patika.dev?', userCounter: 423},
  {roomName: 'JavaScripasdast', userCounter: 456},
  {roomName: 'Pythoasdasn', userCounter: 1231231},
  {roomName: 'Javaasda', userCounter: 423},
  {roomName: 'What isasdasd Patika.dev?', userCounter: 423},
];

const HomePage = props => {
  return (
    <View style={styles.container}>
      <Header title="Rooms" />
      <FlatList
        contentContainerStyle={styles.rooms}
        data={rooms}
        renderItem={({item}) => <ChatRoomItem item={item} />}
        keyExtractor={item => item.roomName}
        numColumns="2"
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  rooms: {
    marginTop: 16,
  },
});
