const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./controllers/users'));
app.use('/api/vacations', require('./controllers/vacations'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
