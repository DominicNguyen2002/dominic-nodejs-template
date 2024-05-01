require('dotenv').config({
  path: `env/.env`,
});
const nodeEnv = process.env.NODE_ENV;

// config dotenv by environment
require('dotenv').config({
  path: `.env.${nodeEnv}`,
});

console.log('ENV:::', nodeEnv, ' PORT:::', process.env.PORT);
const PORT = process.env.PORT || 3055;

// start server nodejs
const app = require('./src/app');
const server = app.listen(port, () => {
  console.log(
    `⚡[Server] Server is running on: http://localhost:${port}/api/v1`
  );
});

process.on('SIGINT', () => {
  server.close(() => console.log(`⚡[Server] Exit Server.`));
});
