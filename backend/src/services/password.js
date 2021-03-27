const crypto = require("crypto");
const { users } = require("../config");

module.exports = {
  hash: async (password) => {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(8).toString("hex");
      crypto.scrypt(
        password,
        salt + users.password_secret,
        64,
        (err, hashedPassword) => {
          if (err) {
            reject(err);
          } else {
            resolve(salt + ":" + hashedPassword.toString("hex"));
          }
        }
      );
    });
  },
  verify: async (password, hash) => {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      return crypto.scrypt(
        password,
        salt + users.password_secret,
        64,
        (err, hashedPassword) => {
          if (err) {
            reject(err);
          }
          resolve(key === hashedPassword.toString("hex"));
        }
      );
    });
  },
};
