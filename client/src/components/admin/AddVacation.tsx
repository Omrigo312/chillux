import React, { useContext } from 'react';
import { WindowContext } from '../../context/WindowContext';
import axios from 'axios';
import Alert from '../../models/Alert';
import { handleError } from '../../utils/error';
import { useHistory } from 'react-router-dom';
import VacationForm from './VacationForm';

export default function AddVacation() {
  const vacationData = {
    destination: '',
    description: '',
    imageUrl: '',
    price: '',
    startDate: '',
    endDate: '',
  };
  const { addAlert } = useContext(WindowContext);
  const history = useHistory();

  const serverRequest = async (body: string, config: object) => {
    try {
      await axios.post('http://localhost:3001/api/vacations', body, config);
      addAlert(new Alert('Vacation added', 'success', 5000));
      history.push('/vacations');
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  return <VacationForm vacationData={vacationData} serverRequest={serverRequest} header="Create Vacation" />;
}
