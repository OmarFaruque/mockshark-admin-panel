import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fetchData from "../libs/api";
import Cookies from 'js-cookie';

import { createLogin, isLoggedIn } from "../libs/auth";
import { isValidEmail } from "../utils/isValidEmail";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import "./css/login.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useHistory();
  
  // const [email, setEmail] = useState("");
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
   const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

  // const handelSubmitEmailPrev = () => {
  //   setLoading(true);
  //   if (!isValidEmail(email)) {
  //     setEmailError("Email is invalid!");
  //   } else {
  //     setEmailError("");

  //     getOtp(email)
  //       .then((result) => {
  //         console.log(result);
  //         if (result.success) {
  //           setOtp("");
  //           setShowOtp(true);
  //           showSuccessToast(result.message);
  //           setLoading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         showErrorToast(error.message ?? "Something went wrong!");
  //         setLoading(false);
  //       });
  //   }
  // };

  // const handelSubmitOtpPrev = () => {
  //   setLoading(true);
  //   if (otp.length === 0) {
  //     setOtpError("Otp is empty!");
  //   } else {
  //     setOtpError("");
  //     submitOtp(email, otp)
  //       .then((result) => {
  //         console.log(result);
  //         if (result.success) {
  //           showSuccessToast(result.message);
  //           router.push("/dashboard");
  //           setLoading(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         showErrorToast(error.message ?? "Something went wrong!");
  //         setLoading(false);
  //       });
  //   }
  // };

  const Error = (text) =>
    !text ? null : (
      <p
        style={{
          color: "red",
          fontSize: "14px",
        }}
      >
        {text}
      </p>
    );

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, [router]);

  const initializeApi = async () => {
    // setLoading(true);
    // setEmailError("");
    const jsonData = await fetchData("/", "GET");

    console.log({ jsonData });

    const message = jsonData.message;

    if (!jsonData.success) {
      // eslint-disable-next-line no-throw-literal
      // setLoading(false);
      showErrorToast(jsonData?.message);
      throw {
        message,
      };
    }

    // showSuccessToast(jsonData.message);
    // setLoading(false);

    return { success: true, message: message };
    // }
  };

  // useEffect(() => {
  //   initializeApi();
  // }, []);

  useEffect(() => {
    const init = async () => {
      if (showOtp) {
        // setTimeout(async () => {
        await fetchData(`/auth/login-with-otp`, "POST", {
          // roleId: "roleId",
          email,
          otp: "1234",
        });
        // }, 1000);
      }
    };

    init();
  }, [showOtp]);

  const handelSubmitEmail = async (email) => {
    setLoading(true);

    if (!isValidEmail(email)) {
      setEmailError("Email is invalid!");
      return;
    } else {
      setEmailError("");
      // await fetchData("/api/v1/auth/send-login-otp", "POST", {
      //   email,
      // });

      const jsonData = await fetchData("/api/v1/auth/send-login-otp", "POST", {
        email,
        type: "admin",
      });

      const message = jsonData.message;

      if (!jsonData.success) {
        // eslint-disable-next-line no-throw-literal
        setLoading(false);
        showErrorToast(jsonData?.message);
        throw {
          message,
        };
      }

      setOtp("");
      setShowOtp(true);
      showSuccessToast(jsonData.message);
      setLoading(false);

      // setTimeout(async () => {
      //   await fetchData(`/auth/login-with-otp`, "POST", {
      //     // roleId: "roleId",
      //     email,
      //     otp,
      //   });
      // }, 1000);

      return { success: true, message: message };
    }
  };

  const handelSubmitOtp = async (email, otp) => {
    setLoading(true);

    if (otp.length === 0) {
      setOtpError("Otp is empty!");
      return;
    } else {
      setOtpError("");
      const jsonData = await fetchData("/api/v1/auth/login-with-otp", "POST", {
        email,
        otp,
      });

      const message = jsonData.message;
      if (!jsonData.success) {
        setLoading(false);
        showErrorToast(jsonData?.message);
        // eslint-disable-next-line no-throw-literal
        throw {
          message,
        };
      }
      createLogin(
        jsonData.data.id,
        jsonData.data.roleId,
        jsonData.data.email,
        jsonData.data.accessToken
      );

      showSuccessToast(jsonData.message);
      // router.push("/dashboard");
      window.location.href = "/dashboard";
      setLoading(false);

      return { success: true, message: message };
    }
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('https://mockshark-backend.vercel.app/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 403 && data.message?.includes("verify")) {
        toast.error('You need to verify your email first');
      } else {
        toast.error(data.message || 'Login failed');
      }
      return;
    }

    // Set cookies
    Cookies.set('accessToken', data.data.accessToken, { expires: 7 });
    Cookies.set('email', data.data.email, { expires: 7 });
    Cookies.set('id', data.data.id, { expires: 7 });
    Cookies.set('roleId', data.data.roleId, { expires: 7 });

    toast.success('Login successful');
    router.push('/dashboard');
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong');
  }
};

  return (
    <>
      <div className="authincation h-100" style={{ background: "#294747" }}>
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <h3 className="text-center mb-4 text-white">
                        Voltech Dashboard
                      </h3>
                      <form className="space-y-6 mt-8" onSubmit={handleLogin}>
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-200 ${
                    isFocused.email || email 
                      ? 'top-[-12px] text-xs bg-white px-2 text-[#1C2836]'
                      : 'top-3 text-sm text-gray-500'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1C2836] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <label 
                  htmlFor="password" 
                  className={`absolute left-4 transition-all duration-200 ${
                    isFocused.password || password 
                      ? 'top-[-12px] text-xs bg-white px-2 text-[#1C2836]'
                      : 'top-3 text-sm text-gray-500'
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1C2836] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex justify-between items-center">
                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-[#1C2836] focus:ring-[#1C2836]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#1C2836] hover:underline">
                  Forgot password?
                </Link> */}
              </div>

              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1C2836] to-[#3A4B5F] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Sign In
              </button>
            </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Login;
