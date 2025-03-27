import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./header";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // パスワードと確認パスワードが一致するかチェック
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    // 必要なフィールドがすべて入力されているかチェック
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    try {
      // APIにデータを送信
      await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
      });
  
      setMessage("Registration successful. Redirecting to login...");
      setError(""); 
      setTimeout(() => router.push("/Compo/login"), 2000);
    } catch (err) {
      setMessage("");
      setError("Registration failed. Try again.");
    }
  };
  
  return (
    <>
      <Header/>
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="/images/bg-reg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative bg-white/100 backdrop-blur-5xl h-auto py-12 px-16 flex flex-col justify-center space-y-10 rounded-2xl shadow-3xl w-1/3 border border-gray-800">
        <h1 className="text-3xl font-bold text-ori-gray tracking-wide">Sign Up</h1>
        <form onSubmit={handleRegister} className="space-y-2 text-ori-gray">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 text-black block w-full px-4 py-3 bg-black/30 border border-ori-gray rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 text-black block w-full px-4 py-3 bg-black/30 border border-ori-gray rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 text-black block w-full px-4 py-3 bg-black/30 border border-ori-gray rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 mb-4 text-black block w-full px-4 py-3 bg-black/30 border border-ori-gray rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-ori-eme text-ori-gray font-medium py-3 px-6 rounded-lg hover:from-gray-600 hover:to-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Sign Up
          </button>
          <div className="flex flex-row gap-1 justify-center items-center text-sm">
            <p>Already have an account?</p>
            <a href="/Compo/login" className="text-ori-eme">Sign In</a>
          </div>
        </form>

        {message && <p className="text-green-400 text-center text-sm">{message}</p>}
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </div>
    </div></>
  );
};

export default Register;