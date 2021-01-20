let userIdToSocket = new Map();

const broadcast = (data, reqUserId) => {
  for (const [userId, socket] of userIdToSocket.entries()) {
    if (reqUserId !== userId) socket.emit('new-vacation', data);
  }
};

module.exports = {
  broadcast,
  userIdToSocket,
};
