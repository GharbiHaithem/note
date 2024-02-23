const socketIO = require('socket.io');
let io;

const configureSocketIO = (server) => {
  io = socketIO(server, {
    cors: {
      origin: 'http://localhost:5173', // Remplacez ceci par l'URL de votre client React
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized. Make sure to call configureSocketIO first.');
  }
  return io;
};

module.exports = { configureSocketIO, getIO };
