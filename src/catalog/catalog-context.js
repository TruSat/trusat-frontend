import React from "react";

const CatalogStateContext = React.createContext();
const CatalogDispatchContext = React.createContext();

function catalogReducer(state, action) {
  switch (action.type) {
    case "SET_CATALOG_FILTER": {
      return { ...state, catalogFilter: action.payload };
    }

    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function CatalogProvider({ children }) {
  const [state, dispatch] = React.useReducer(catalogReducer, {
    catalogFilter: "priorities"
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
    throw new Error(`useAuthState must be used with an AuthProvider`);
  }
  return context;
}

function useCatalogDispatch() {
  const context = React.useContext(CatalogDispatchContext);
  if (context === undefined) {
    throw new Error(`useAuthDispatch must be used within an AuthProvider`);
  }
  return context;
}

export { CatalogProvider, useCatalogState, useCatalogDispatch };
