import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {SET_USER} from '../store/actions';
import {useSelector} from 'react-redux';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const loggedInUser = auth().currentUser;
  console.log('1----->');
  console.log(loggedInUser);
  useEffect(() => {
    if (loggedInUser !== null && currentUser !== loggedInUser) {
      dispatch(SET_USER(loggedInUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, dispatch]);

  return {loading};
};

export default useUser;
