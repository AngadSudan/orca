import client from "../utils/redis";

function getKey(email: string) {
  return `email:${email}`;
}
async function getOtp(email: string) {
  try {
    return await client.getCache(getKey(email));
  } catch (error) {
    throw new Error("failed to set to redis");
  }
}
async function setOtp(email: string, otp: string) {
  try {
    return await client.setCache(getKey(email), otp);
  } catch (error) {
    throw new Error("failed to set to redis");
  }
}
async function deleteOtp(email: string) {
  try {
    return await client.invalidateCache(getKey(email));
  } catch (error) {
    throw new Error("failed to set to redis");
  }
}
export async function generateOTP(email: string): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await setOtp(email, otp);
  return otp;
}
export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const correctOtp = await getOtp(email);
  if (otp !== correctOtp) return false;
  return true;
}
