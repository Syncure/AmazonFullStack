//Setup data layer
//We need this to track the basket

import React, { createContext, useContext, useReducer } from "react";

//Prepara la capa de datos
export const StateContext = createContext();

//envuelva nuestra aplicación y proporciona la capa de datos
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Extrae información de la capa de datos
export const useStateValue = () => useContext(StateContext);
