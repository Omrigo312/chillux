/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { VacationsContext } from '../../context/VacationsContext';
import { Vacation } from '../../models/Vacation';
import VacationCard from './VacationCard';

export default function Vacations() {
  const { vacations, setVacations } = useContext(VacationsContext);

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
    <div>
      {vacations.map((vacation: Vacation) => {
        return <VacationCard vacation={vacation} />;
      })}
    </div>
  );
}
