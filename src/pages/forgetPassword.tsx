"use client";

import { forgotPassword, resetPassword } from "@/api/authcontrol/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

export default function ForgetPassword() {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Email or username is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setEmail(values.email);
      try {
        const data = await forgotPassword(values);
        if (data.status === 200) {
          setResponseMsg(data.data);
          setErrors("");
        } else if (
          data.message?.includes("User not found with username/email")
        ) {
          setErrors("Email or username not found");
        }
      } catch (error) {
        setErrors("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleResetValidation = async () => {
    if (!newPassword) {
      setFailMsg("Please enter a new password");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await resetPassword({ email, otp, newPassword });
      if (data.status === 200) {
        setSuccessMsg(data.data);
        setFailMsg("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else if (
        data.message === "An unexpected error occurred. Please try again later."
      ) {
        setFailMsg("Invalid OTP entered");
      }
    } catch (error) {
      setFailMsg("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            {!responseMsg
              ? "Enter your email to receive a one-time password"
              : "Enter the OTP sent to your email"}
          </p>
        </div>

        {!responseMsg ? (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email or Username
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email or username"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                disabled={isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.email}
                </p>
              )}
              {errors && <p className="mt-1 text-sm text-red-600">{errors}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !formik.values.email}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isSubmitting || !formik.values.email
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Get OTP"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                One-Time Password
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />

              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  OTP sent to: {email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setResponseMsg("");
                    setOtp("");
                    setNewPassword("");
                    setSuccessMsg("");
                    setFailMsg("");
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Change email
                </button>
              </div>
            </div>

            {otp.length === 6 && (
              <div className="space-y-4 pt-2 border-t border-gray-200">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleResetValidation}
                  disabled={isSubmitting || !newPassword}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    isSubmitting || !newPassword
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600 font-medium">
                  {successMsg}
                </p>
              </div>
            )}

            {failMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 font-medium">{failMsg}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
