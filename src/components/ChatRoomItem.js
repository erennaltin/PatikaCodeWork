import React from 'react';
import {TouchableHighlight, Text, StyleSheet, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChatRoomItem = ({item, navigation, index}) => {
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
            roomName: item.roomName,
            roomId: index,
          }),
      },
    ]);
  let icon;

  switch (item.roomName) {
    case 'Python':
      icon = <Icon name={'python'} brand size={30} color="#3973A4" />;
      break;
    case 'PHP':
      icon = <Icon name={'php'} brand size={30} color="#6181B6" />;
      break;
    case 'Java':
      icon = <Icon name={'java'} brand size={30} color="#E74C3C" />;
      break;
    case 'CSS3':
      icon = <Icon name={'css3-alt'} brand size={30} color="#016FBA" />;
      break;
    case 'HTML5':
      icon = <Icon name={'html5'} brand size={30} color="#E56542" />;
      break;
    case 'JavaScript':
      icon = <Icon name={'js'} brand size={30} color="#F7E018" />;
      break;
    case 'React':
      icon = <Icon name={'react'} brand size={30} color="#00D8FF" />;
      break;
    case 'Vue':
      icon = <Icon name={'vuejs'} brand size={30} color="#3FB984" />;
      break;
    case 'Less':
      icon = <Icon name={'less'} brand size={30} color="#1E416F" />;
      break;
    default:
      icon = <Icon name={'dev'} brand size={30} color="#2FDDB0" />;
      break;
  }

  return (
    <TouchableHighlight
      onPress={handleVisitRoom}
      underlayColor="rgba(255,255,255,0.4)"
      style={styles.container}>
      <View style={styles.innerContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.roomName}>
          {item.roomName}
        </Text>
        <Text>{icon}</Text>
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
});

export default ChatRoomItem;
