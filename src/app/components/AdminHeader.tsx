"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  // Add other user properties as needed
}

const AdminHeader = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from localStorage only on client side
    const userData = localStorage.getItem("adminUser");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear token from cookies and localStorage
    document.cookie = "adminToken=; path=/; max-age=0";
    localStorage.removeItem("adminUser");
    router.push("/admin");
  };

  return (
    <header className="shadow border-b-[0.8px] border-b-gray-600 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              width={152}
              height={38}
              alt="Arsot logo"
              priority
              className="cursor-pointer"
              onClick={() => router.push("/admin/Dashboard")}
            />
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-white font-['Montserrat']">
                Welcome, {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium font-['Montserrat'] uppercase tracking-wide transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
