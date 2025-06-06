import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@/api/api_URL";
import { useDispatch } from "react-redux";
import { login } from "@/Features/auth/authSlice";
import { setEmail, setPassword as Pass } from "@/Features/auth/credentialSlice";
import { useRouter } from "next/router";
import { imgHelper } from "@/lib/image-helper";
import GoogleButton from "@/components/Elements/utils/googleButton";
import { Dialog } from "@headlessui/react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const seerTechLogo = imgHelper.seertech;

  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    if (username === "" || password === "") {
      setError("Please Enter Username and Password");
      return;
    }
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
        console.log(response.data.message);
        if (response.data.message === "Login Successful!") {
          setMessage(response.data.message);
        }
        dispatch(setEmail(username));
        dispatch(Pass(password));
        setError("");
        dispatch(
          login({
            user: {
              username: response.data.username,
              role: response.data.roles[0].roleName,
            },
          })
        );
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      console.log(err.message);
      setError("Login Failed Please Try Again");
    }
  }

  return (
    <main className="text-xs md:text-base">
      <header className="bg-slate-50 text-white py-2">
        <img src={seerTechLogo} className="object-cover md:h-16 h-10" />
      </header>
      <div className="flex justify-center items-center dark:bg-black w-full h-auto mt-10">
        <div className="bg-white border border-gray-300 dark:bg-black md:p-8 p-4 rounded-lg shadow-lg w-max md:w-1/4 space-y-12 m-10 md:m-0">
          <h1 className="md:text-xl text-lg font-bold text-center dark:text-white text-gray-800 mb-6">
            Login
          </h1>

          {/* Messages and Errors */}
          {message && (
            <p className="text-green-500 dark:text-green-400 font-sans mt-4 text-center">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-500 md:text-lg text-xs mt-4 font-sans text-center">
              {error}
            </p>
          )}

          {/* Username Input */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm md:text-lg font-sans  text-blue-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 space-y-2">
            <label className="block text-sm md:text-lg font-sans text-blue-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-black"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
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

          <span className="text-blue-500 cursor-pointer text-center my-6" onClick={() => router.push("/forgetPassword")}>Forget Password ?</span>

          

          {/* Divider */}
          {/* <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}

          {/* Sign in with Google Button */}
          {/* <GoogleButton /> */}
        </div>
        
      </div>
      <footer className="bg-blue-500 py-2 px-2 w-full text-white fixed bottom-0 z-10">
        <p className="text-center">
          &copy; Copyright {new Date().getFullYear()} SeerTech Systems. All
          rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default LoginPage;
