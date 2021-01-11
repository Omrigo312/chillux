const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./controllers/users'));
app.use('/api/vacations', require('./controllers/vacations'));
app.use('/api/followed-vacations', require('./controllers/followedVacations'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
