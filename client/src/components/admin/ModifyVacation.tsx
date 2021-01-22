/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { WindowContext } from '../../context/WindowContext';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../../models/Alert';
import { handleError } from '../../utils/error';
import VacationForm from './VacationForm';

export default function ModifyVacation() {
  const [vacationData, setVacationData] = useState({
    destination: '',
    description: '',
    imageUrl: '',
    price: '',
    startDate: null,
    endDate: null,
  });
  const { addAlert } = useContext(WindowContext);
  const params = useParams();
  const id = Object(params).id;
  const history = useHistory();

  const getVacation = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/vacations/${id}`);
      if (!res.data) {
        return addAlert(new Alert(`No vacation with id ${id}`, 'warning', 3000));
      }
      const vacation = res.data;
      vacation.startDate = new Date(vacation.startDate);
      vacation.endDate = new Date(vacation.endDate);
      setVacationData(vacation);
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  useEffect(() => {
    getVacation();
  }, []);

  const serverRequest = async (body: string, config: object) => {
    try {
      await axios.put(`http://localhost:3001/api/vacations/${id}`, body, config);
      addAlert(new Alert('Vacation modified', 'success', 5000));
      history.push('/vacations');
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  return <VacationForm vacationData={vacationData} serverRequest={serverRequest} header="Modify Vacation" />;
}
