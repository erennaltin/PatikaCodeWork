import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {SET_USER} from '../store/actions';

const useUser = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const loggedInUser = auth().currentUser;
  useEffect(() => {
    if (loggedInUser !== null) {
      dispatch(SET_USER(loggedInUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loggedInUser, dispatch]);

  return {loading};
};

export default useUser;
