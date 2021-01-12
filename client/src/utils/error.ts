
import Alert from '../models/Alert';

export const handleError = (error: any, addAlert: (alert: Alert) => void) => {
  console.log(error);
  try {
    addAlert(new Alert(error.response.data.message, 'error', 3000));
  } catch (err) {
    console.log(err);
    addAlert(new Alert('Something is wrong with our servers...', 'error', 3000));
  }
};
