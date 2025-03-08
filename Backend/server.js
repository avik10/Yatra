const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app.js');
const { initializeSocket } = require('./socket.js');
const PORT = process.env.PORT;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


