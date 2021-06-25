import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const introduction = roomName => {
  return (
    <Text style={styles.createdText}>{roomName} room has been created!</Text>
  );
};

const RoomPage = props => {
  const user = auth().currentUser;
  const roomName = props.route.params.roomName;
  const roomId = props.route.params.roomId;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/Rooms/${roomId}`)
      .on('value', snapshot => {
        let list = snapshot.val().messages;
        if (list[0] === null) {
          list = {};
        }
        const keyList = Object.keys(list);
        let result = keyList.map((key, index) => {
          list[key].id = index;
          user.displayName === list[key].user
            ? (list[key].theme = 'Secondary')
            : '';

          return list[key];
        });
        result = result.filter(item => (item === 'giris' ? false : true));
        setMessages(result.reverse());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/Rooms/${roomId}`).off('value', onValueChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <View style={styles.container}>
      <Header title={props.route.params.roomName} />
      <FlatList
        style={styles.messageContainer}
        ListHeaderComponent={introduction(roomName)}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Message item={item} theme={item.theme} />}
      />
      <MessageInput roomId={roomId} />
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
