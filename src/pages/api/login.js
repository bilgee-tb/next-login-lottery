export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { password, otp } = req.body;

  const staticPassword = "letmein";
  const correctOTP = "042"; // simulate the winning OTP

  if (password !== staticPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  if (otp === correctOTP) {
    return res.status(200).json({ message: "Success" });
  }

  return res.status(403).json({ message: "Invalid OTP" });
}
