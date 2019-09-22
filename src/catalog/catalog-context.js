import React from "react";

const CatalogStateContext = React.createContext();
const CatalogDispatchContext = React.createContext();

function catalogReducer(state, action) {
  switch (action.type) {
    case "SET_PRIORITIES_DATA": {
      return { ...state, prioritiesData: action.payload };
    }
    case "SET_UNDISCLOSED_DATA": {
      return { ...state, undisclosedData: action.payload };
    }
    case "SET_DEBRIS_DATA": {
      return { ...state, debrisData: action.payload };
    }
    case "SET_LATEST_DATA": {
      return { ...state, latestData: action.payload };
    }
    case "SET_ALL_DATA": {
      return { ...state, allData: action.payload };
    }
    case "SET_PRIORITIES_TLE_DATA": {
      return { ...state, prioritiesTleData: action.payload };
    }
    case "SET_ALL_TLE_DATA": {
      return { ...state, allTleData: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function CatalogProvider({ children }) {
  const [state, dispatch] = React.useReducer(catalogReducer, {
    prioritiesData: [],
    undisclosedData: [],
    debrisData: [],
    latestData: [],
    allData: [],
    prioritiesTleData: "",
    allTleData: ""
  });

  return (
    <CatalogStateContext.Provider value={state}>
      <CatalogDispatchContext.Provider value={dispatch}>
        {children}
      </CatalogDispatchContext.Provider>
    </CatalogStateContext.Provider>
  );
}

function useCatalogState() {
  const context = React.useContext(CatalogStateContext);
  if (context === undefined) {
    throw new Error(`useObjectsState must be used with a ObjectsProvider`);
  }
  return context;
}

function useCatalogDispatch() {
  const context = React.useContext(CatalogDispatchContext);
  if (context === undefined) {
    throw new Error(`useObjectsDispatch must be used within a ObjectsProvider`);
  }
  return context;
}

export { CatalogProvider, useCatalogState, useCatalogDispatch };
