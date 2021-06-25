import combinedReducer from './store/reducers';
import {Provider} from 'react-redux';
import React from 'react';
import Router from './Router';
import {createStore} from 'redux';
import {StatusBar} from 'react-native';

const App = () => {
  const store = createStore(combinedReducer);
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <Router />
    </Provider>
  );
};

export default App;
