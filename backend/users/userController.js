import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const registerUser = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    password,
    phone_number,
    country,
    business_name,
    bank_name,
    bank_code,
    account_number,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    phone_number,
    country,
    business_name,
    bank_name,
    bank_code,
    account_number,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, registerUser };
