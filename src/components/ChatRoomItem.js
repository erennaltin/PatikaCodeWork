import React from 'react';
import {TouchableHighlight, Text, StyleSheet, View, Alert} from 'react-native';

const ChatRoomItem = ({item, navigation}) => {
  const handleVisitRoom = () =>
    Alert.alert(item.roomName, 'Do you really want to join this room?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          navigation.navigate('Room', {
            params: {roomName: item.roomName},
          }),
      },
    ]);

  return (
    <TouchableHighlight
      onPress={handleVisitRoom}
      underlayColor="rgba(255,255,255,0.4)"
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.roomName}>
          {item.roomName}
        </Text>
        <View style={styles.counterContainer}>
          <Text style={styles.userCounter}>{item.userCounter}</Text>
          <Text> Icon </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 16,
    marginBottom: 36,
    marginLeft: 36,
    transform: [{translateX: -18}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  roomName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  counterContainer: {flexDirection: 'row'},
  userCounter: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatRoomItem;
