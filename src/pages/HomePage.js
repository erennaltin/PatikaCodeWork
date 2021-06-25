import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import Header from '../components/Header';
import AddRoomButton from '../components/AddRoomButton';
import database from '@react-native-firebase/database';

const HomePage = props => {
  const [rooms, setRooms] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const reference = database().ref('/Rooms');

  const fetchListFromFirebase = () => {
    setLoading(true);
    reference
      .once('value')
      .then(snapshot => {
        const list = snapshot.val();
        const keys = Object.keys(list);
        const result = keys.map(key => list[key]);
        setRooms(result);
        setKeyList(keys);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchListFromFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Rooms" />
      {loading ? (
        <ActivityIndicator size="large" color="white" style={styles.rooms} />
      ) : error ? (
        <View style={styles.nullContainer}>
          <Text> Flottie Ekle buraya</Text>
          <Text style={styles.nullText}> There is nothing here! </Text>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.rooms}
            data={rooms}
            renderItem={({item, index}) => (
              <ChatRoomItem
                item={item}
                index={keyList[index]}
                navigation={props.navigation}
              />
            )}
            keyExtractor={item => item.roomName}
            numColumns="2"
          />
        </>
      )}
      {!loading && (
        <AddRoomButton
          roomList={rooms}
          fetchListFromFirebase={fetchListFromFirebase}
        />
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  rooms: {
    marginTop: 16,
  },
  nullContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nullText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
