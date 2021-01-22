/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { VacationsContext } from '../../context/VacationsContext';
import { WindowContext } from '../../context/WindowContext';
import { Vacation } from '../../models/Vacation';
import { handleError } from '../../utils/error';
import SearchIcon from '@material-ui/icons/Search';

import VacationCard from './VacationCard';

export default function AllVacations() {
  const [loadingVacations, setLoadingVacations] = useState(true);
  const { authState } = useContext(AuthContext);

  const { vacations, setVacations, setFollowedVacations, followedVacations, resetVacationsState } = useContext(
    VacationsContext
  );
  const { navbarHeight, addAlert } = useContext(WindowContext);

  const fetchVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/vacations');
      setVacations(res.data);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const fetchFollowedVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/followed-vacations');
      setFollowedVacations(res.data);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  useEffect(() => {
    resetVacationsState();
    if (authState.loading) {
      return;
    }
    (async () => {
      if (authState.isAuthenticated) {
        await fetchFollowedVacations();
      }
      await fetchVacations();
      setLoadingVacations(false);
    })();
  }, [authState]);

  return (
    <div className="all-vacations" style={{ marginTop: `${navbarHeight + 10}px` }}>
      <div className="search" style={{ justifySelf: 'center', width: '80%' }}>
        <TextField
          style={{ width: '100%' }}
          variant="outlined"
          placeholder="Find a vacation..."
          onChange={() => {}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {loadingVacations || authState.loading ? (
        <CircularProgress style={{ justifySelf: 'center' }} />
      ) : !vacations.length ? (
        <h1 style={{ justifySelf: 'center' }}>No Vacations Found!</h1>
      ) : (
        vacations
          .sort((a: any, b: any) => +followedVacations.includes(b.id) - +followedVacations.includes(a.id))
          .map((vacation: Vacation, index: number) => {
            return <VacationCard vacation={vacation} key={vacation.id} index={index} />;
          })
      )}
    </div>
  );
}
