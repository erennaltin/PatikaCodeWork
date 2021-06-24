import initialStates from '../initialStates';

const loginErrorReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.payload.user};
    case 'SET_ERROR':
      return {...state, loginError: action.payload.error};
    default:
      return {...state};
  }
};

export default loginErrorReducer;
