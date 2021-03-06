/* eslint-disable react-hooks/exhaustive-deps */
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { WindowContext } from '../../context/WindowContext';
import { AuthContext } from '../../context/AuthContext';
import Alert from '../../models/Alert';

interface VacationFormProps {
  vacationData: any;
  header: string;
  serverRequest: (body: string, config: object) => void;
}

export default function VacationForm({ vacationData, header, serverRequest }: VacationFormProps) {
  const [formData, setFormData] = useState(vacationData);
  const { navbarHeight, addAlert } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setFormData(vacationData);
  }, [vacationData]);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    const onlyDigits = /^[0-9\b]+$/;

    // price validation
    if ((price === '' || onlyDigits.test(price)) && price.length <= 5) {
      setFormData({ ...formData, price });
    }
  };

  const isStartDateValidated = () => {
    if (startDate && isNaN(startDate.getTime())) {
      return [false, 'Invalid date input'];
    }
    if (startDate && startDate.getFullYear() >= new Date().getFullYear() + 6) {
      return [false, `Choose a year earlier than ${new Date().getFullYear() + 6}`];
    }
    if (startDate && startDate < new Date()) {
      return [false, 'Start date cannot be before today'];
    }

    return [true];
  };

  const isEndDateValidated = () => {
    if (endDate && isNaN(endDate.getTime())) {
      return [false, 'Invalid date input'];
    }
    if (endDate && endDate < startDate) {
      return [false, 'End date must be before start date'];
    }

    return [true];
  };

  const onStartDateChange = (date: Date | null) => {
    setFormData({ ...formData, startDate: date });
  };

  const onEndDateChange = (date: Date | null) => {
    setFormData({ ...formData, endDate: date });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isStartDateValidated()[0]) {
      return addAlert(new Alert(isStartDateValidated()[1], 'warning', 3000));
    }
    if (!isEndDateValidated()[0]) {
      return addAlert(new Alert(isEndDateValidated()[1], 'warning', 3000));
    }

    if (!window.confirm('Do you confirm these changes?')) {
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    serverRequest(body, config);
  };

  const { destination, description, imageUrl, price, startDate, endDate } = formData;

  return (
    <div className="add-vacation" style={{ marginTop: `${navbarHeight + 15}px` }}>
      {authState.userType !== 'ADMIN' ? (
        <h2>You are not authorized to do that</h2>
      ) : (
        <form className="form" autoComplete="off" onSubmit={onSubmit} method="post">
          <h2 className="form-header">{header}</h2>
          <div className="form-duo">
            <TextField
              type="text"
              value={destination}
              required
              className="input-field"
              label="Destination"
              variant="outlined"
              name="destination"
              onChange={onFieldChange}
              inputProps={{ maxLength: 20 }}
            />
            <TextField
              required
              type="text"
              value={price}
              className="input-field"
              label="Price"
              variant="outlined"
              name="price"
              InputProps={{ endAdornment: <InputAdornment position="end">$</InputAdornment> }}
              onChange={onPriceChange}
            />
          </div>
          <TextField
            type="text"
            required
            value={description}
            className="input-field"
            label="Description"
            multiline
            rows={8}
            error={description.length < 10 && description.length > 0}
            helperText={description.length < 10 && description.length > 0 && 'Too short (<10)'}
            variant="outlined"
            name="description"
            onChange={onFieldChange}
            inputProps={{ minLength: 10, maxLength: 2000 }}
          />
          <TextField
            type="text"
            value={imageUrl}
            className="input-field"
            label="Image URL"
            variant="outlined"
            name="imageUrl"
            onChange={onFieldChange}
          />

          <div className="form-duo">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Start date"
                placeholder="dd/mm/yyyy"
                value={startDate}
                onChange={onStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                error={!isStartDateValidated()[0]}
                helperText={!isStartDateValidated()[0] && isStartDateValidated()[1]}
              />
              <KeyboardDatePicker
                required
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="End date"
                placeholder="dd/mm/yyyy"
                value={endDate}
                onChange={onEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                error={!isEndDateValidated()[0]}
                helperText={!isEndDateValidated()[0] && isEndDateValidated()[1]}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button className="form-button login-button" variant="contained" color="primary" type="submit">
            {header}
          </Button>
        </form>
      )}
    </div>
  );
}
