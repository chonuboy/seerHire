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
import { Eye, EyeOff, User, Lock } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex justify-center items-center max-h-full p-4">
        <div className="bg-slate-50 rounded-2xl shadow-lg w-full mt-8 max-w-md p-8 space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Sign in to your Account
          </h1>

          {/* Messages and Errors */}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Username Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRemember(!remember)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                  remember ? "bg-cyan-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    remember ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-700">Remember me</span>
            </div>
            <button
              type="button"
              onClick={() => {
                router.push("/forgetPassword");
              }}
              className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            onClick={() => handleLogin({ username, password })}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-200"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-200">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>
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
