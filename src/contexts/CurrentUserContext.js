import React from "react";

// A context having the value of the current user
const CurrentUserContext = React.createContext({
  currentUser: "",
});

export { CurrentUserContext };
