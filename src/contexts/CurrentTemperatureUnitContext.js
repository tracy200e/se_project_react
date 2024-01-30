import React from 'react';

// A context having the value of the current choice of temperature unit
const CurrentTemperatureUnitContext = React.createContext({
    currentTemperatureUnit: "",
    handleToggleSwitchChange: () => {}
});

export { CurrentTemperatureUnitContext };