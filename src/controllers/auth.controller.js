import { User } from "../models/user.model.js";
import AsyncHandler from "../utils/Asynchandler.js";

const cookieOptions = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite: "strict",

  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const fields = {
    name: "name",
    email: "email",
    password: "password",
  };

  for (const [key, label] of Object.entries(fields)) {
    const value = req.body[key];
    if (!value || value.trim() === "") {
      return res.status(409).json({
        status: 409,
        message: `${label} is missing`,
      });
    }
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: 409,
      message: "user already exist",
    });
  }

  const createdUser = await User.create({
    name: name,
    email: email,
    password: password,
  });

  const safeUser = await User.findById(createdUser._id);
  return res.status(201).json({
    status: 201,
    safeUser,
    message: `User Registered Successfully`,
  });
});

const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const fields = {
    email: "email",
    password: "password",
  };

  for (const [key, label] of Object.entries(fields)) {
    const value = req.body[key];
    if (!value || value.trim() === "") {
      return res.status(409).json({
        status: 409,
        message: `${label} is missing`,
      });
    }
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(405).json({
      status: 405,
      message: "user does-not exist",
    });
  }

  const isMatch = await user.isPasswordCorrect(password);

  if (!isMatch) {
    return res.status(402).json({
      status: 402,
      message: "wrong credentials entered",
    });
  }

  const token = user.generateAccessToken();

  const LoggedInUser = await User.findById(user._id);
  return res.status(201).cookie("token", token, cookieOptions).json({
    statusCode: 201,
    LoggedInUser,
    message: "User Login Successful",
  });
});

const getMe = AsyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(404, "user not found");
  }

  return res.status(200).json({
    statusCode: 200,
    user,
    message: "data Successfully fetched",
  });
});

export { register, login, getMe };
