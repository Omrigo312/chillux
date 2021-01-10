import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { InputAdornment, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function AddVacation() {
  const [formData, setFormData] = useState({
    destination: '',
    description: '',
    imageUrl: '',
    price: null,
    startDate: null,
    endDate: null,
  });

  const { destination, description, imageUrl, price, startDate, endDate } = formData;

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onStartDateChange = (date: Date | null) => {
    setFormData({ ...formData, startDate: date });
  };

  const onEndDateChange = (date: Date | null) => {
    setFormData({ ...formData, endDate: date });
  };

  const onSubmit = () => {};
  return (
    <div className="island-background-auth">
      <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
        <h2 className="form-header">Add New Vacation</h2>
        <TextField
          type="text"
          value={destination}
          required
          className="input-field"
          label="Destination"
          variant="outlined"
          name="destination"
          onChange={onFieldChange}
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          type="text"
          required
          value={description}
          className="input-field"
          label="Description"
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
        <TextField
          required
          type="number"
          value={price}
          className="input-field"
          label="Price"
          variant="outlined"
          name="price"
          InputProps={{ endAdornment: <InputAdornment position="end">$</InputAdornment> }}
          onChange={onFieldChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Start date (dd/mm/yyyy)"
            value={startDate}
            onChange={onStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            required
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="End date (dd/mm/yyyy)"
            value={endDate}
            onChange={onEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </form>
    </div>
  );
}
