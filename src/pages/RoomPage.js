import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/Rooms/${roomId}`)
      .on('value', snapshot => {
        let list = snapshot.val().messages;
        if (list[0] === null) {
          list = {};
        }
        let keyList = Object.keys(list);
        const result = keyList.map((key, index) => {
          list[key].id = index;
          user.displayName === list[key].user
            ? (list[key].theme = 'Secondary')
            : '';
          return list[key];
        });
        const newResult = result.filter(item =>
          item === 'giris' ? false : true,
        );
        const sortedList = newResult.sort((a, b) => {
          return a.date > b.date ? false : true;
        });
        setMessages(sortedList);
        setLoading(false);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/Rooms/${roomId}`).off('value', onValueChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <View style={styles.container}>
      <Header title={props.route.params.roomName} />
      {loading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <FlatList
          inverted
          style={styles.messageContainer}
          ListFooterComponent={introduction(roomName)}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Message item={item} theme={item.theme} />}
        />
      )}

      <MessageInput roomId={roomId} />
    </View>
  );
};

export default RoomPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
