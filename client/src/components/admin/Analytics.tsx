import axios from 'axios';
import React, { Fragment, useContext, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { AuthContext } from '../../context/AuthContext';
import { VacationsContext } from '../../context/VacationsContext';
import { WindowContext } from '../../context/WindowContext';
import { handleError } from '../../utils/error';

export default function Analytics() {
  const { navbarHeight, addAlert } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);
  const { setVacations, vacations } = useContext(VacationsContext);

  // Fetch vacations from server
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/vacations');
        setVacations(res.data);
      } catch (error) {
        handleError(error, addAlert);
      }
    })();
  }, [addAlert, setVacations]);

  const data = vacations
    .filter((vacation) => vacation.followers !== 0)
    .map((vacation, index) => ({
      destination: vacation.destination,
      followers: vacation.followers,
      id: vacation.id,
      index: index + 1,
    }));

  return (
    <div className="analytics" style={{ marginTop: navbarHeight + 15 }}>
      {authState.userType !== 'ADMIN' ? (
        <h1>You are not authorized to do that</h1>
      ) : (
        <Fragment>
          <h2>Analytics:</h2>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              label="Vacation"
              style={{ tickLabels: { fontSize: 8, padding: 5 }, axisLabel: { padding: 25 } }}
              tickFormat={data.map((key) => key.destination)}
            />
            <VictoryAxis
              label="Followers"
              style={{ tickLabels: { fontSize: 10, padding: 5 }, axisLabel: { padding: 30 } }}
              dependentAxis
            />
            <VictoryBar
              data={data}
              style={{ labels: { fontSize: 8, padding: 2 } }}
              labels={data.map((key) => `ID: ${key.id}`)}
              x="index"
              y="followers"
            />
          </VictoryChart>
        </Fragment>
      )}
    </div>
  );
}
