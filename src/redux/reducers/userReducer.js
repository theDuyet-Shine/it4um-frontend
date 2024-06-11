const initialState = {
  isAuthenticated: false,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "USER_LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
