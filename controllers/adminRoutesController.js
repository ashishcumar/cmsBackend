const asyncHandler = require("express-async-handler");
const admin_data = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "All fields are mandatory!",
    });
    throw new Error("All fields are mandatory! ");
  }
  const adminAvailable = await admin_data.findOne({ email });
  if (adminAvailable) {
    res.status(400).json({
      message: "admin-id already available",
    });
    throw new Error("admin-id already available");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await admin_data.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newAdmin) {
    res.status(201).json(newAdmin);
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory! ");
  }
  const adminAvailable = await admin_data.findOne({ email });
  if (
    adminAvailable &&
    (await bcrypt.compare(password, adminAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          name: adminAvailable.name,
          email: adminAvailable.email,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "7d" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "email or password is not valid !" });
    throw new Error("email or password is not valid !");
  }
  res.json({ message: "user login" });
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const allAdmins = await admin_data.find();
  if (!allAdmins) {
    res.status(400);
    throw new Error("No admin available! ");
  }
  res.status(200).json(allAdmins);
});

module.exports = { register, login, getAllAdmins };
