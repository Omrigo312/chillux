/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { VacationsContext } from '../../context/VacationsContext';
import { WindowContext } from '../../context/WindowContext';
import { Vacation } from '../../models/Vacation';
import VacationCard from './VacationCard';

export default function AllVacations() {
  const [loadingVacations, setLoadingVacations] = useState(true);

  const { vacations, setVacations, setFollowedVacations, followedVacations } = useContext(VacationsContext);
  const { navbarHeight } = useContext(WindowContext);
  const { loadUser } = useContext(AuthContext);

  const fetchVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/vacations');
      setVacations(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const fetchFollowedVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/followed-vacations');
      setFollowedVacations(res.data);
      setLoadingVacations(false);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    loadUser();
    fetchVacations();
    fetchFollowedVacations();
  }, []);

  return (
    <div className="all-vacations" style={{ marginTop: navbarHeight + 15 }}>
      {loadingVacations ? (
        <CircularProgress style={{ justifySelf: 'center' }} />
      ) : !vacations.length ? (
        <h1 style={{ justifySelf: 'center' }}>No Vacations Found!</h1>
      ) : (
        vacations
          .sort((a: any, b: any) => +followedVacations.includes(b.id) - +followedVacations.includes(a.id))
          .map((vacation: Vacation) => {
            return <VacationCard vacation={vacation} key={vacation.id} />;
          })
      )}
    </div>
  );
}
