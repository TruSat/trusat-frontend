import React from "react";

const ObjectsStateContext = React.createContext();
const ObjectsDispatchContext = React.createContext();

function objectsReducer(state, action) {
  switch (action.type) {
    case "SET_NORAD_NUMBER": {
      return { ...state, noradNumber: action.payload };
    }
    case "SET_OBJECT_ORIGIN": {
      return { ...state, objectOrigin: action.payload };
    }
    case "SET_OBJECT_BACKGROUND": {
      return { ...state, objectBackground: action.payload };
    }
    case "SET_OBJECT_INFO": {
      return { ...state, objectInfo: action.payload };
    }
    case "SET_OBSERVATION_FILTER": {
      return { ...state, observationFilter: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function ObjectsProvider({ children }) {
  const [state, dispatch] = React.useReducer(objectsReducer, {
    noradNumber: "",
    objectOrigin: "",
    objectBackground: "",
    objectInfo: {},
    observationFilter: "influence"
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
    throw new Error(`useObjectsState must be used with a ObjectsProvider`);
  }
  return context;
}

function useObjectsDispatch() {
  const context = React.useContext(ObjectsDispatchContext);
  if (context === undefined) {
    throw new Error(`useObjectsDispatch must be used within a ObjectsProvider`);
  }
  return context;
}

export { ObjectsProvider, useObjectsState, useObjectsDispatch };
