import jwt from "jsonwebtoken";

const generateJWT = async (id: number) => {
  const token = jwt.sign({ userId: id }, "shhh", { expiresIn: "1h" });
  return token;
};

export default generateJWT;
