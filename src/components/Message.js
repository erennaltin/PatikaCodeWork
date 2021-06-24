import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Message = ({author = false, theme = 'Primary', ...props}) => {
  const [seeDetail, setDetail] = useState(false);

  return (
    <View style={[styles.innerContainer, styles[`innerContainer${theme}`]]}>
      <View style={styles.photoContainer}>
        <Text> A </Text>
      </View>
      <TouchableWithoutFeedback onLongPress={() => setDetail(!seeDetail)}>
        <View
          style={[styles.messageContainer, styles[`messageContainer${theme}`]]}>
          <Text style={styles.message}> Message </Text>
          {seeDetail && (
            <View
              hide={seeDetail}
              style={[
                styles.informationContainer,
                styles[`informationContainer${theme}`],
              ]}>
              <Text style={styles.informationPiece}> Date</Text>
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
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: 'red',
  },
  innerContainer: {
    alignItems: 'flex-end',
    maxWidth: '70%',
    minWidth: '100%',
    backgroundColor: 'yellow',
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
    marginLeft: 16,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  messageContainerSecondary: {
    marginRight: 16,
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
