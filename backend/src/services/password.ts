import crypto from "crypto";
import config from "../config";

const { users } = config;

export default {
  hash: async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(8).toString("hex");
      crypto.scrypt(password, salt + users.password_secret, 64, (err, hashedPassword) => {
        if (err) {
          reject(err);
        } else {
          resolve(salt + ":" + hashedPassword.toString("hex"));
        }
      });
    });
  },
  verify: async (password: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      return crypto.scrypt(password, salt + users.password_secret, 64, (err, hashedPassword) => {
        if (err) {
          reject(err);
        }
        resolve(key === hashedPassword.toString("hex"));
      });
    });
  },
};
