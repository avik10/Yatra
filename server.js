const dotenv = require('dotenv')
dotenv.config()
const http = require('http');
const app = require('./app.js')
const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


