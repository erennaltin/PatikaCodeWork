export const SET_USER = user => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const LOG_OUT = () => {
  return {
    type: 'LOG_OUT',
  };
};
