import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';

const Message = ({theme = 'Primary', item}) => {
  const [seeDetail, setDetail] = useState(false);
  const [source, setSource] = useState(require('../static/user.png'));
  const username = item.user;

  useEffect(() => {
    database()
      .ref(`UserPhotos/${username}`)
      .once('value')
      .then(data => {
        setSource(data.val().photoURL);
      });

    return () => {};
  }, [username]);

  return (
    <View style={[styles.innerContainer, styles[`innerContainer${theme}`]]}>
      <View style={styles.photoContainer}>
        <Image source={source} style={styles.photo} />
      </View>
      <TouchableWithoutFeedback onLongPress={() => setDetail(!seeDetail)}>
        <View
          style={[styles.messageContainer, styles[`messageContainer${theme}`]]}>
          <Text style={styles.message}> {item.message} </Text>
          {seeDetail && (
            <View
              hide={seeDetail}
              style={[
                styles.informationContainer,
                styles[`informationContainer${theme}`],
              ]}>
              <Text style={styles.informationPiece}> {item.user} </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  photoContainer: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  photo: {
    width: 36,
    height: 36,
    overflow: 'hidden',
  },
  innerContainer: {
    // alignItems: 'flex-end',
    // justifyContent: 'center',
    maxWidth: '70%',
    minWidth: '100%',
    marginBottom: 8,
    marginTop: 16,
  },
  informationContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'darkorange',
    paddingRight: 8,
    width: '100%',
  },
  informationPiece: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: 'orange',
    borderRadius: 16,
    minWidth: '40%',
    paddingBottom: 12,
  },
  message: {
    fontSize: 16,
    padding: 4,
    color: 'white',
  },

  innerContainerPrimary: {
    flexDirection: 'row',
  },

  innerContainerSecondary: {
    flexDirection: 'row-reverse',
  },

  messageContainerPrimary: {
    marginLeft: 8,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  messageContainerSecondary: {
    marginRight: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  informationContainerPrimary: {
    borderBottomLeftRadius: 16,
    justifyContent: 'flex-end',
  },
  informationContainerSecondary: {
    borderBottomRightRadius: 16,
    justifyContent: 'flex-start',
  },
});
