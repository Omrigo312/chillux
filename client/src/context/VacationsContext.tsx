import React, { createContext, useState } from 'react';
import { Vacation } from '../models/Vacation';

interface StateInterface {
  vacations: Vacation[];
  setVacations: (vacations: Vacation[]) => void;
  followedVacations: number[];
  setFollowedVacations: (followedVacationsId: number[]) => void;
  resetState: () => void;
}

const initialState: StateInterface = {
  vacations: [],
  setVacations: null,
  followedVacations: [],
  setFollowedVacations: null,
  resetState: null,
};

export const VacationsContext = createContext<StateInterface>(initialState);

export const VacationsProvider = ({ children }: any) => {
  const [vacations, setVacations] = useState(initialState.vacations);
  const [followedVacations, setFollowedVacations] = useState(initialState.followedVacations);

  const resetState = () => {
    setVacations(initialState.vacations);
    setFollowedVacations(initialState.followedVacations);
  };

  return (
    <VacationsContext.Provider value={{ vacations, setVacations, followedVacations, setFollowedVacations, resetState }}>
      {children}
    </VacationsContext.Provider>
  );
};
