const { Server } = require('socket.io');
const User = require('./models/user.model');
const Captain = require('./models/captain.model');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);


        socket.on('join', async ({ userId, userType }) => {
            try {
                if (userType === 'user') {
                    await User.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
                }
                console.log(`User ${userId} of type ${userType} joined with socket ID: ${socket.id}`);
            } catch (error) {
                console.error(`Error updating socket ID for user ${userId} of type ${userType}:`, error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, message) => {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized.');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
