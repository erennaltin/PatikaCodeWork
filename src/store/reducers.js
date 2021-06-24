import {combineReducers} from 'redux';
import userReducer from './reducerFolder/userReducer';

let combinedReducers = combineReducers({
  user: userReducer,
});
export default combinedReducers;
