import React from "react";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATING": {
      return { ...state, isAuthenticating: action.payload };
    }
    case "SET_AUTH_TYPE": {
      return { ...state, authType: action.payload };
    }
    case "SET_USER_ADDRESS": {
      return { ...state, userAddress: action.payload };
    }
    case "SET_AUTH_EXPIRY": {
      return { ...state, authExpiry: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(authReducer, {
    isAuthenticating: false,
    authType: "",
    userAddress: undefined,
    authExpiry: ""
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error(`useAuthState must be used with an AuthProvider`);
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(`useAuthDispatch must be used within an AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };
