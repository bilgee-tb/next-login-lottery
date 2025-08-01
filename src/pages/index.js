import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState("password");
  const [password, setPassword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [status, setStatus] = useState("");

  const handlePasswordSubmit = () => {
    if (password === "letmein") {
      setStep("otp");
      setStatus("");
    } else {
      setStatus("Incorrect password.");
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, otp: otpInput }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setStep("success");
      } else {
        setStatus(
          `Try again! Your OTP guess was: ${otpInput.padStart(3, "0")}`
        );
      }
    } catch (err) {
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className=" bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        {step === "password" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-2 w-full mb-4 rounded"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Submit
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
            <input
              type="number"
              placeholder="Enter OTP (001–100)"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="border px-4 py-2 w-full mb-4 rounded"
            />
            <button
              onClick={handleOTPSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Verify
            </button>
          </>
        )}

        {step === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🎉 Success!
            </h2>
            <img
              src="/victory.jpg"
              alt="Victory"
              className="rounded shadow-md mx-auto"
            />
          </>
        )}

        {status && <p className="mt-4 text-red-600">{status}</p>}
      </div>
    </div>
  );
}
