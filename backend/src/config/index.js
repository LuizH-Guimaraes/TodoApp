const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: process.env.API_PREFIX,
  },
  db: {
    url: process.env.DB_URL,
  },
  session: {
    secret: process.env.JWT_SECRET,
  },
};
