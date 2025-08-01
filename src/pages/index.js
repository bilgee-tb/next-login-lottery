import { useState } from 'react';

export default function Home() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [win, setWin] = useState(false);
  const staticPassword = 'letmein'; // Set your static password here
  const winningNumber = 42;

  const handleLogin = () => {
    if (password !== staticPassword) {
      setStatus('Incorrect password.');
      return;
    }

    const luckyNumber = Math.floor(Math.random() * 100) + 1;
    const padded = String(luckyNumber).padStart(3, '0');
    if (luckyNumber === winningNumber) {
      setWin(true);
    } else {
      setStatus(`Try again! Your number was: ${padded}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      {!win ? (
        <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="px-4 py-2 border rounded w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <p className="mt-4 text-red-600">{status}</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold mb-4">🎉 You Logged In Successfully!</h2>
          <img src="/victory.jpg" alt="Victory" className="rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
