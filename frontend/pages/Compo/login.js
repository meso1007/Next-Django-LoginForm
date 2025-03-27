import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      router.push("/Compo/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      setMessage("Login successful");
      setError("");

      sessionStorage.setItem("access_token", response.data.access_token);
      sessionStorage.setItem("username", response.data.username);

      router.push("/Compo/dashboard");
    } catch (err) {
      setMessage("");
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Header />
      <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/bg-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative bg-white/100 backdrop-blur-5xl h-auto py-20 px-16 flex flex-col justify-center space-y-10 rounded-2xl shadow-3xl w-1/3 border border-gray-800">
          <h1 className="text-3xl font-bold text-ori-gray tracking-wide">
            Sign In
          </h1>
          <form onSubmit={handleLogin} className="space-y-12 text-ori-gray">
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
                className="text-black block w-full px-4 py-3 bg-black/30 border border-ori-gray rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ori-gray"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" block text-black w-full px-4 py-3 bg-black/30 border border-ori-gray text-white rounded-lg shadow-md focus:ring-2 focus:ring-ori-eme focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-ori-eme text-ori-gray font-medium py-3 px-6 rounded-lg hover:from-gray-600 hover:to-gray-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Login
            </button>
            <div className="flex flex-row gap-1 justify-center items-center text-sm">
              <p>You Don't have an Account?</p>
              <a href="/Compo/register" className="text-ori-eme">
                Sign Up
              </a>
            </div>
          </form>

          {message && (
            <p className="text-green-400 text-center text-sm">{message}</p>
          )}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
