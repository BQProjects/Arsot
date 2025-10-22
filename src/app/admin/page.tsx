"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("Admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `adminToken=${data.token}; path=/; max-age=604800; samesite=strict`;
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        router.push("/admin/Dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <div className="flex flex-col flex-shrink-0 items-center gap-6 py-4 px-0 w-full h-24 border-b-[0.8px] border-b-[#f5f5f5]">
        <div className="flex justify-center items-center self-stretch py-0 px-14">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={152}
              height={50}
              alt="ARSOT Logo"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="w-full h-px" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-10">
        <div className="text-white font-['Playfair_Display'] text-4xl leading-[130%] text-center">
          Admin Login Screen
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-10"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
              Email ID
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex items-center p-4 w-[507px] h-11 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
              Password
            </div>
            <div className="flex justify-between items-center p-4 w-[507px] h-11 border border-[#d9d9d9]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white font-['Montserrat'] leading-[160%] bg-transparent flex-1 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                {showPassword ? (
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.0136 11.7722C22.9817 11.6991 22.2017 9.96938 20.4599 8.2275C18.8436 6.61313 16.0667 4.6875 11.9999 4.6875C7.93299 4.6875 5.15611 6.61313 3.53986 8.2275C1.79799 9.96938 1.01799 11.6962 0.986113 11.7722C0.954062 11.8442 0.9375 11.9221 0.9375 12.0009C0.9375 12.0798 0.954062 12.1577 0.986113 12.2297C1.01799 12.3019 1.79799 14.0316 3.53986 15.7734C5.15611 17.3878 7.93299 19.3125 11.9999 19.3125C16.0667 19.3125 18.8436 17.3878 20.4599 15.7734C22.2017 14.0316 22.9817 12.3047 23.0136 12.2297C23.0457 12.1577 23.0622 12.0798 23.0622 12.0009C23.0622 11.9221 23.0457 11.8442 23.0136 11.7722ZM11.9999 18.1875C9.05799 18.1875 6.48924 17.1169 4.36393 15.0066C3.47303 14.1211 2.71912 13.1078 2.12705 12C2.71896 10.8924 3.47289 9.87936 4.36393 8.99438C6.48924 6.88313 9.05799 5.8125 11.9999 5.8125C14.9417 5.8125 17.5105 6.88313 19.6358 8.99438C20.5268 9.87936 21.2808 10.8924 21.8727 12C21.2755 13.1447 18.2811 18.1875 11.9999 18.1875ZM11.9999 7.6875C11.1469 7.6875 10.3132 7.94042 9.60397 8.41429C8.89478 8.88815 8.34204 9.56167 8.01563 10.3497C7.68923 11.1377 7.60383 12.0048 7.77023 12.8413C7.93663 13.6779 8.34735 14.4463 8.95047 15.0494C9.55358 15.6525 10.322 16.0632 11.1585 16.2296C11.9951 16.396 12.8622 16.3106 13.6502 15.9842C14.4382 15.6578 15.1117 15.1051 15.5856 14.3959C16.0594 13.6867 16.3124 12.8529 16.3124 12C16.3109 10.8567 15.856 9.76067 15.0476 8.95225C14.2392 8.14382 13.1432 7.68899 11.9999 7.6875ZM11.9999 15.1875C11.3694 15.1875 10.7532 15.0006 10.229 14.6503C9.7048 14.3001 9.29625 13.8022 9.055 13.2198C8.81374 12.6374 8.75062 11.9965 8.87361 11.3781C8.9966 10.7598 9.30018 10.1919 9.74596 9.7461C10.1917 9.30032 10.7597 8.99674 11.378 8.87375C11.9963 8.75076 12.6372 8.81388 13.2197 9.05513C13.8021 9.29639 14.2999 9.70494 14.6502 10.2291C15.0004 10.7533 15.1874 11.3696 15.1874 12C15.1874 12.8454 14.8515 13.6561 14.2538 14.2539C13.656 14.8517 12.8452 15.1875 11.9999 15.1875Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16.5C9.525 16.5 7.5 14.475 7.5 12C7.5 9.525 9.525 7.5 12 7.5C14.475 7.5 16.5 9.525 16.5 12C16.5 14.475 14.475 16.5 12 16.5ZM12 9C10.35 9 9 10.35 9 12C9 13.65 10.35 15 12 15C13.65 15 15 13.65 15 12C15 10.35 13.65 9 12 9Z"
                      fill="white"
                    />
                    <path
                      d="M12.0002 19.5C7.21518 19.5 3.01518 16.59 1.54518 12.24C1.48494 12.0857 1.48494 11.9143 1.54518 11.76C3.01518 7.425 7.23018 4.5 12.0002 4.5C16.7702 4.5 20.9852 7.41 22.4552 11.76C22.5152 11.91 22.5152 12.09 22.4552 12.24C20.9852 16.575 16.7702 19.5 12.0002 19.5ZM3.04518 12C4.38018 15.6 7.95018 18 12.0002 18C16.0502 18 19.6052 15.6 20.9552 12C19.6202 8.4 16.0502 6 12.0002 6C7.95018 6 4.39518 8.4 3.04518 12Z"
                      fill="white"
                    />
                    <path
                      d="M21 21.7504C20.9016 21.7516 20.8041 21.7322 20.7137 21.6934C20.6233 21.6547 20.542 21.5974 20.475 21.5254L2.475 3.52535C2.175 3.22535 2.175 2.76035 2.475 2.46035C2.775 2.16035 3.24 2.16035 3.54 2.46035L21.525 20.4754C21.825 20.7754 21.825 21.2404 21.525 21.5404C21.375 21.6904 21.18 21.7654 21 21.7654V21.7504Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-[#f90] hover:bg-[#e68a00] text-white font-['Montserrat'] font-medium leading-[120%] uppercase rounded disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
