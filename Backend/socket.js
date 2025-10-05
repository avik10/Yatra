const { Server } = require('socket.io');
const User = require('./models/user.model');
const Captain = require('./models/captain.model');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:8000", "http://localhost:5173", "https://yatri-sathi.netlify.app"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);


        socket.on('join', async ({ userId, userType }) => {
            console.log(userId, userType)
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

        socket.on('update-location-captain', async ({ userId, lat, lng }) => {
            try {
                await Captain.findByIdAndUpdate(userId, { location: { lat, lng } });
                console.log(`Updated location for captain ${userId} to lat: ${lat}, lng: ${lng}`);
            } catch (error) {
                console.error(`Error updating location for captain ${userId}:`, error);
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.type, messageObject.data);
    } else {
        console.error('Socket.io is not initialized.');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
