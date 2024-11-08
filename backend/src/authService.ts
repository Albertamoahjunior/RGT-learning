import dotenv from "dotenv";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

//hashing password
const hash_password = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
}

const check_pass = async (password: string, userpass: string): Promise<boolean> => {
  return await bcrypt.compare(password, userpass);
}

//generate access token
const generate_access_token = (username: string): string | null => {
  const accessSecret = process.env.JWT_ACCESS_SECRET as Secret;
  if (!accessSecret) {
    console.error("JWT_ACCESS_SECRET is not defined");
    return null;
  }

  return jwt.sign({ username }, accessSecret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
  });
}

//generate refresh token
const generate_refresh_token = (username: string): string | null => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
  if (!refreshSecret) {
    console.error("JWT_REFRESH_SECRET is not defined");
    return null;
  }

  return jwt.sign({ username }, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
}

//verify access token
export const verify_access_token = (token: string): JwtPayload | null => {
  try {
    const accessSecret = process.env.JWT_ACCESS_SECRET as Secret;
    if (!accessSecret) throw new Error("JWT_ACCESS_SECRET is not defined");

    const decoded = jwt.verify(token, accessSecret);
    return typeof decoded === 'object' ? decoded as JwtPayload : null;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
}

//verify refresh token
const verify_refresh_token = (token: string): JwtPayload | null => {
  try {
    const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;
    if (!refreshSecret) throw new Error("JWT_REFRESH_SECRET is not defined");

    const decoded = jwt.verify(token, refreshSecret);
    return typeof decoded === 'object' ? decoded as JwtPayload : null;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null;
  }
}

export default {
  hash_password,
  generate_access_token,
  generate_refresh_token,
  verify_access_token,
  verify_refresh_token,
  check_pass
}
