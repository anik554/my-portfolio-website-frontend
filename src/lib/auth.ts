import jwt from "jsonwebtoken";

export function decodeToken(token: string) {
  try {
    return jwt.decode(token); // does NOT verify signature
  } catch {
    return null;
  }
}
