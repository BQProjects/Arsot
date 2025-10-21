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
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
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
          <div className="flex items-center space-x-6 ">
            <div
              className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white cursor-pointer"
              onClick={() => router.push("/admin/FBOManager")}
            >
              <span className="text-base tracking-wide">fbo manager</span>
              <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
            <div
              className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white cursor-pointer"
              onClick={() => router.push("/admin/CrewBrief")}
            >
              <span className="text-base tracking-wide">Crew Brief</span>
              <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
            <div
              className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white cursor-pointer"
              onClick={() => router.push("/admin/PressRoom")}
            >
              <span className="text-base tracking-wide">Press Room</span>
              <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
            <div
              className="flex flex-col items-center group font-['Montserrat'] font-medium uppercase text-white cursor-pointer"
              onClick={() => router.push("/admin")}
            >
              <span className="text-base tracking-wide">Manage Admin</span>
              <div className="h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </div>
            <div
              className="flex justify-center items-center gap-3 py-4 px-4  bg-[#f90]"
              onClick={handleLogout}
            >
              <div className="get_a_quote text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                Logout
              </div>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.44616 16.3366L12.2099 10.4803C12.3363 10.3525 12.4072 10.18 12.4072 10.0003C12.4072 9.82057 12.3363 9.64808 12.2099 9.52031L6.44741 3.66281C6.32107 3.53424 6.25027 3.36119 6.25027 3.18093C6.25027 3.00067 6.32107 2.82763 6.44741 2.69906C6.50914 2.63575 6.58291 2.58543 6.66438 2.55108C6.74585 2.51672 6.83337 2.49902 6.92179 2.49902C7.01021 2.49902 7.09773 2.51672 7.1792 2.55108C7.26067 2.58543 7.33444 2.63575 7.39616 2.69906L13.1587 8.55406C13.5373 8.93971 13.7495 9.45859 13.7495 9.99906C13.7495 10.5395 13.5373 11.0584 13.1587 11.4441L7.39616 17.2991C7.33442 17.3626 7.26058 17.413 7.17899 17.4475C7.0974 17.482 7.00973 17.4997 6.92116 17.4997C6.8326 17.4997 6.74492 17.482 6.66334 17.4475C6.58175 17.413 6.5079 17.3626 6.44616 17.2991C6.31982 17.1705 6.24902 16.9974 6.24902 16.8172C6.24902 16.6369 6.31982 16.4639 6.44616 16.3353"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
