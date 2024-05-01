// config dotenv by environment
require('dotenv').config({
  path: `env/.env`,
});

const configs = require('./configs/config');
const port = configs.app.PORT;

// start server
const app = require('./src/app');
const server = app.listen(port, () => {
  console.log(
    `⚡[Server] Server is running on: http://localhost:${port}/api/v1`
  );
});

process.on('SIGINT', () => {
  server.close(() => console.log(`⚡[Server] Exit Server.`));
});
