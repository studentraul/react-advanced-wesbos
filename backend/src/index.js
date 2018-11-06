// Make .env available for the whole app
require("dotenv").config({ path: "variables.env" });

const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

/* Middlewares */
// TODO: JWT
// TODO: Populate current users

server.start(
  {
    cors: {
      credentials: true,
      /* Only enable cors for our front-end */
      origin: process.env.FRONTEND_URL
    }
  },
  deets =>
    console.log(`Server is now running on port http://localhost:${deets.port}`)
);
