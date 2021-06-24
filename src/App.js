import combinedReducer from './store/reducers';
// import initialStates from './store/initialStates';
import {Provider} from 'react-redux';
import React from 'react';
import Router from './Router';
import {createStore} from 'redux';

const App = () => {
  const store = createStore(combinedReducer);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
