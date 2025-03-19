import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@/api/api_URL";
import { useDispatch } from "react-redux";
import { login} from "@/Features/auth/authSlice";
import { setEmail, setPassword as Pass } from "@/Features/auth/credentialSlice";
import { useRouter } from "next/router";
import { imgHelper } from "@/lib/image-helper";
import GoogleButton from "@/components/Elements/googleButton";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const response = await axios.get(API_URL + "users/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",

          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      });
      if (response.request.status == 200) {
        setMessage(response.data.message);
        dispatch(setEmail(username));
        dispatch(Pass(password));
        setError("");
        dispatch(login({ user: {username:response.data.username,role:response.data.roles[0].roleName} }));
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      console.log(err);
      setError("An error occured while logging in please login again");
    }
  }

  return (
    <main className="text-xs md:text-base">
      <header className="bg-slate-50 text-white py-2">
        <img src={imgHelper.seertech} className="object-cover md:h-16 h-10" />
      </header>
      <div className="flex justify-center items-center p-8 bg-gray-50 pb-28">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-10 m-10 md:m-0">
          <h1 className="md:text-2xl text-xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm md:text-lg font-medium  text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Remember me</label>
          </div>

          {/* Login Button */}
          <button
            onClick={() => handleLogin({ username, password })}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Sign in with Google Button */}
          <GoogleButton />

          {/* Messages and Errors */}
          {message && (
            <p className="text-green-500 text-lg font-sans mt-4 text-center">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-lg mt-4 font-sans text-center">
              {error}
            </p>
          )}
        </div>
      </div>
      <footer className="bg-blue-500 py-2 px-2 w-full text-white fixed bottom-0 z-10">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Seertech. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default LoginPage;
