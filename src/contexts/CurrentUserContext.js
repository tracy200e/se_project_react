import React from "react";

// A context having the value of the current choice of temperature unit
const CurrentUserContext = React.createContext({
  currentUser: "",
});

export { CurrentUserContext };
