import React from "react";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "SET_USER_DATA": {
      return { ...state, userData: action.payload };
    }
    case "SHOW_USER_PROFILE": {
      return { ...state, showUserProfile: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {
    userData: {},
    showUserProfile: false
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error(`useAuthState must be used with an AuthProvider`);
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error(`useAuthDispatch must be used within an AuthProvider`);
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
