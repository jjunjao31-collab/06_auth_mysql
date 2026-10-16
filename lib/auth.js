import { SignJWT, jwtVerify } from "jose";

// jose expects the secret as bytes, not plain string
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Create signed token expiring in 1 hour
export function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

// Return payload if token is valid, otherwise null
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null; // invalid, tampered, or expired token
  }
}
