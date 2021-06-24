import initialStates from '../initialStates';

const userReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload.user};
    case 'LOG_OUT':
      return {state, user: null};
    default:
      return {...state};
  }
};

export default userReducer;
