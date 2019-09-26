import React from "react";

const ProfileStateContext = React.createContext();
const ProfileDispatchContext = React.createContext();

function ProfileReducer(state, action) {
  switch (action.type) {
    case "SET_PROFILE_DATA": {
      console.log(`set profile data, now ${action.payload.user_name}`);
      return { ...state, profileData: action.payload };
    }
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

function ProfileProvider({ children }) {
  const [state, dispatch] = React.useReducer(ProfileReducer, {
    profileData: {}
  });

  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
}

function useProfileState() {
  const context = React.useContext(ProfileStateContext);
  if (context === undefined) {
    throw new Error(`useProfileState must be used with an ProfileProvider`);
  }
  return context;
}

function useProfileDispatch() {
  const context = React.useContext(ProfileDispatchContext);
  if (context === undefined) {
    throw new Error(
      `useProfileDispatch must be used within an ProfileProvider`
    );
  }
  return context;
}

export { ProfileProvider, useProfileState, useProfileDispatch };
