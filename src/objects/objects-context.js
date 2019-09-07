import React from "react";

const ObjectsStateContext = React.createContext();
const ObjectsDispatchContext = React.createContext();

function objectsReducer(state, action) {
  switch (action.type) {
    case "SET_OBJECT_INFO": {
      return { ...state, objectInfo: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function ObjectsProvider({ children }) {
  const [state, dispatch] = React.useReducer(objectsReducer, {
    objectInfo: {}
  });

  return (
    <ObjectsStateContext.Provider value={state}>
      <ObjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ObjectsDispatchContext.Provider>
    </ObjectsStateContext.Provider>
  );
}

function useObjectsState() {
  const context = React.useContext(ObjectsStateContext);
  if (context === undefined) {
    throw new Error(`useAuthState must be used with an AuthProvider`);
  }
  return context;
}

function useObjectsDispatch() {
  const context = React.useContext(ObjectsDispatchContext);
  if (context === undefined) {
    throw new Error(`useAuthDispatch must be used within an AuthProvider`);
  }
  return context;
}

export { ObjectsProvider, useObjectsState, useObjectsDispatch };
