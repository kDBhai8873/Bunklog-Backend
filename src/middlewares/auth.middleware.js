import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/Asynchandler.js";

const auth = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "unauthorized Access",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
});

export default auth;
