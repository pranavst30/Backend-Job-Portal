import jwt from "jsonwebtoken";

export const createToken = (user) =>
  jwt.sign(
    { userId: user._id, isEmp: user.isEmployer },
    process.env.JWT_KEY,
    { expiresIn: "3d" }
  );

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);
