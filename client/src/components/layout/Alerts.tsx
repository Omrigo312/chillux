import React, { useContext } from 'react';
import { WindowContext } from '../../context/WindowContext';
import { Alert } from '@material-ui/lab';

export default function Alerts() {
  const { alerts, navbarHeight } = useContext(WindowContext);
  return (
    <section className="alerts-box" style={{ marginTop: `${navbarHeight + 10}px` }}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert className="alert" key={alert.id} severity={alert.severity}>
            {alert.message}
          </Alert>
        ))}
    </section>
  );
}
