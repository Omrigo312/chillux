import React, { createContext, useState } from 'react';
import { Vacation } from '../models/Vacation';

interface StateInterface {
  vacations: Vacation[];
  setVacations: (data: Vacation[]) => void;
}

const initialState: StateInterface = {
  vacations: [],
  setVacations: null,
};

export const VacationsContext = createContext<StateInterface>(initialState);

export const VacationsProvider = ({ children }: any) => {
  const [vacations, setVacations] = useState([]);

  return <VacationsContext.Provider value={{ vacations, setVacations }}>{children}</VacationsContext.Provider>;
};
