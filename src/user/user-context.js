import React from "react";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function UserReducer(state, action) {
  switch (action.type) {
    case "SET_USER_DATA": {
      return { ...state, userData: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(UserReducer, {
    userData: {}
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
    throw new Error(`useUserState must be used with a UserProvider`);
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error(`useUserDispatch must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch };
