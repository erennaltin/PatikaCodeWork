import React, {useState} from 'react';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';
import AddRoomButton from '../components/AddRoomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const ModalContainer = props => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(true);

  const goToProfile = () => {
    setMenuModalVisible(false);
    props.navigation.navigate('ProfilePage');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => {
          setMenuModalVisible(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setMenuModalVisible(false);
          }}
          android_disableSound>
          <AddRoomButton
            setButtonUnvisible={setAddVisible}
            roomList={props.roomList}
            fetchListFromFirebase={props.fetchListFromFirebase}
            up={true}
          />
          {addVisible && (
            <>
              <Pressable
                onPress={goToProfile}
                style={[styles.buttonContainer, styles.profileButtonContainer]}>
                <Text style={styles.buttonText}>
                  <AwesomeIcon name={'user-cog'} size={25} color="darkorange" />
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMenuModalVisible(false)}
                style={[styles.buttonContainer, styles.openButtonContainer]}>
                <View>
                  <Text style={styles.buttonText}>
                    <AwesomeIcon
                      name={'angle-double-down'}
                      size={30}
                      color="darkorange"
                    />
                  </Text>
                </View>
              </Pressable>
            </>
          )}
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => {
          setMenuModalVisible(true);
          setAddVisible(true);
        }}
        style={[styles.buttonContainer, styles.openButtonContainer]}>
        <View>
          <Text style={styles.buttonText}>
            <Icon name="menu-sharp" size={30} color="darkorange" />
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'orange',
    borderWidth: StyleSheet.hairlineWidth * 5,
  },
  newRoomButtonContainer: {
    bottom: 270,
  },
  profileButtonContainer: {
    bottom: 100,
  },
  openButtonContainer: {
    bottom: 10,
  },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'orange',
    fontSize: 36,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInnerContainer: {
    width: '90%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 16,
  },
  form: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
