const express = require('express');
const cors = require('cors');
const http = require('http');
const errorHandler = require('./errors/errorHandler');
const ErrorType = require('./errors/errorType');
const ServerError = require('./errors/serverError');
const pushService = require('./services/push');
const jwt = require('jsonwebtoken');
const config = require('./config.json');

const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Run when client connects
io.use((socket, next) => {
  try {
    jwt.verify(socket.handshake.query.token, config.jwtSecret, (error, decoded) => {
      if (error) {
        throw new ServerError(ErrorType.INVALID_TOKEN);
      } else {
        socket.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    console.log(error.errorType);
    return next(error.errorType);
  }
}).on('connection', (socket) => {
  // Connection now authenticated
  pushService.userIdToSocket.set(socket.decoded.user.id, socket);
});

// Routes
app.use('/api/users', require('./controllers/users'));
app.use('/api/vacations', require('./controllers/vacations'));
app.use('/api/followed-vacations', require('./controllers/followedVacations'));

app.use(errorHandler);

// io.listen(httpServer);
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
