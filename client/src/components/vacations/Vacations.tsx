/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { VacationsContext } from '../../context/VacationsContext';
import { WindowContext } from '../../context/WindowContext';
import { Vacation } from '../../models/Vacation';
import VacationCard from './VacationCard';

export default function Vacations() {
  const { vacations, setVacations } = useContext(VacationsContext);
  const { navbarHeight } = useContext(WindowContext);

  const fetchVacations = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/vacations');
      const data = res.data;
      let allVacations = [];
      for (const vacation of data) {
        const { id, description, destination, imageUrl, price, followers, startDate, endDate } = vacation;
        allVacations.push(new Vacation(id, description, destination, imageUrl, price, followers, startDate, endDate));
      }
      setVacations(allVacations);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVacations();
  }, []);

  return (
    <div className="vacations" style={{ marginTop: navbarHeight + 15 }}>
      {vacations.map((vacation: Vacation) => {
        return <VacationCard vacation={vacation} key={vacation.id} />;
      })}
    </div>
  );
}
