import initialStates from '../initialStates';

const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('HEREEEE');
      console.log(action.payload);
      return {...state, user: action.payload};
    case 'LOG_OUT':
      console.log('CIKISSSSS');
      return {...state, user: {}};
    default:
      return {...state};
  }
};

export default userReducer;
