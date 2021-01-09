/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { VacationsContext } from '../../context/VacationsContext';
import { WindowContext } from '../../context/WindowContext';
import { Vacation } from '../../models/Vacation';
import VacationCard from './VacationCard';

export default function AllVacations() {
  const [loadingVacations, setLoadingVacations] = useState(true);

  const { vacations, setVacations } = useContext(VacationsContext);
  const { navbarHeight } = useContext(WindowContext);

  const fetchVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/vacations');
      setLoadingVacations(false);
      setVacations(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVacations();
  }, []);

  return (
    <div className="all-vacations" style={{ marginTop: navbarHeight + 15 }}>
      {loadingVacations ? (
        <CircularProgress style={{ justifySelf: 'center' }} />
      ) : !vacations.length ? (
        <h1 style={{ justifySelf: 'center' }}>No Vacations Found!</h1>
      ) : (
        vacations.map((vacation: Vacation) => {
          return <VacationCard vacation={vacation} key={vacation.id} />;
        })
      )}
    </div>
  );
}
