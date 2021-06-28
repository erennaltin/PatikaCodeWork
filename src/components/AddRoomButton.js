import React, {useState} from 'react';
import {Text, View, Modal, Pressable, StyleSheet} from 'react-native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddRoomButton = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const reference = database().ref('/Rooms').push();
  const signUpValidationSchema = yup.object().shape({
    roomName: yup.string().required('Please enter a room name!'),
  });
  const roomNames = props.roomList.map(item => item.roomName);

  const setNewRoomFirebase = async values => {
    setLoading(true);
    if (roomNames.indexOf(values.roomName) === -1) {
      reference
        .set({
          roomName: values.roomName,
          messages: {1: 'giris'},
        })
        .then(() => {
          setModalVisible(!modalVisible);
          props.fetchListFromFirebase();
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      setError('There is already a room called' + values.roomName);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          props.setButtonUnvisible(true);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.setButtonUnvisible(true);
          }}
          android_disableSound>
          <Pressable
            style={styles.modalInnerContainer}
            onPress={() => null}
            android_disableSound>
            <Formik
              validateOnMount
              validationSchema={signUpValidationSchema}
              initialValues={{
                roomName: '',
              }}
              onSubmit={values => setNewRoomFirebase(values)}>
              {({handleSubmit, isValid}) => (
                <View style={styles.form}>
                  <Field
                    component={CustomInput}
                    name="roomName"
                    theme="Secondary"
                    placeholder="Write Your Room Name Here!                       "
                  />
                  <CustomButton
                    style={styles.customButton}
                    onPress={handleSubmit}
                    title="Create Room"
                    disabled={!isValid}
                    theme="Third"
                    loading={loading}
                  />
                  {error && <Text style={styles.error}> {error} </Text>}
                </View>
              )}
            </Formik>
          </Pressable>
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
          props.setButtonUnvisible(false);
        }}
        style={[styles.buttonContainer, props.up && styles.up]}>
        <Text style={styles.buttonText}>
          <Icon name={'post-add'} size={40} color="darkorange" />
        </Text>
      </Pressable>
    </View>
  );
};

export default AddRoomButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    position: 'absolute',
    right: 10,
    bottom: -160,
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'orange',
    borderWidth: StyleSheet.hairlineWidth * 5,
  },
  buttonText: {
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
