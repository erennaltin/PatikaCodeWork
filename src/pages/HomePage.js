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
import database from '@react-native-firebase/database';
import ModalContainer from '../components/ModalContainer';

const HomePage = props => {
  const [rooms, setRooms] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchListFromFirebase = () => {
    setLoading(true);
    const unsubscribe = database()
      .ref('/Rooms')
      .once('value')
      .then(snapshot => {
        const list = snapshot.val();
        const keys = Object.keys(list);
        const result = keys.map(key => list[key]);
        const newKeys = [...keys];
        keys.sort((a, b) => {
          let index = newKeys.indexOf(a);
          let index2 = newKeys.indexOf(b);

          const first = result[index];
          const second = result[index2];
          return ('' + first.roomName).localeCompare(second.roomName);
        });
        result.sort((a, b) => {
          return ('' + a.roomName).localeCompare(b.roomName);
        });

        setRooms(result);
        setKeyList(keys);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    return unsubscribe;
  };

  useEffect(() => {
    let unsubscribe;
    let load = true;
    if (load) {
      unsubscribe = fetchListFromFirebase();
    }

    return () => {
      load = false;
      return unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Rooms" />
      {loading ? (
        <ActivityIndicator size="large" color="white" style={styles.rooms} />
      ) : error ? (
        <View style={styles.nullContainer}>
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
        <ModalContainer
          roomList={rooms}
          fetchListFromFirebase={fetchListFromFirebase}
          navigation={props.navigation}
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
