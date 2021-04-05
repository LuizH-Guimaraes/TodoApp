import jwt from "jsonwebtoken";
import { session } from "../config";

// Verify authentication
export default (req, res, next) => {
  const authorizationField = req.headers["authorization"];

  if (!authorizationField)
    return res.status(401).json({
      error: true,
      message: "No token provided.",
      result: "You need to send a token",
    });
  const token = authorizationField.split("Bearer ")[1];
  jwt.verify(token, session.secret, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    next();
  });
};
