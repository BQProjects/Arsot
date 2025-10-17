"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminHeader from "../../components/AdminHeader";

interface AdminUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];
    const userData = localStorage.getItem("adminUser");

    if (!token || !userData) {
      router.push("/admin");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/admin");
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white font-['Montserrat']">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Header */}
      <div className="relative z-20">
        <AdminHeader />
      </div>

      {/* Background Section */}
      <div className="bg-black min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0">
          <Image
            src="/grid.svg"
            width={458}
            height={342}
            alt="Grid pattern"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-24 px-14">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-16">
              <h1 className="text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%] mb-4">
                Admin Dashboard
              </h1>
              <p className="text-white font-['Montserrat'] text-lg opacity-80">
                Welcome back, {user.email}
              </p>
            </div>

            {/* Management Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => router.push("/admin/FBOManager")}
              >
                <h3 className="text-white font-['Montserrat'] font-medium text-xl mb-4 uppercase tracking-wide">
                  FBO Manager
                </h3>
                <p className="text-white/80 font-['Montserrat'] text-base mb-6">
                  Manage FBO profiles and services
                </p>
                <div className="flex items-center text-white font-['Montserrat'] font-medium">
                  <span>Manage</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => router.push("/admin/CrewBrief")}
              >
                <h3 className="text-white font-['Montserrat'] font-medium text-xl mb-4 uppercase tracking-wide">
                  Crew Brief
                </h3>
                <p className="text-white/80 font-['Montserrat'] text-base mb-6">
                  Manage crew briefings and information
                </p>
                <div className="flex items-center text-white font-['Montserrat'] font-medium">
                  <span>Manage</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => router.push("/admin/PressRoom")}
              >
                <h3 className="text-white font-['Montserrat'] font-medium text-xl mb-4 uppercase tracking-wide">
                  Press Room
                </h3>
                <p className="text-white/80 font-['Montserrat'] text-base mb-6">
                  Manage press releases and media
                </p>
                <div className="flex items-center text-white font-['Montserrat'] font-medium">
                  <span>Manage</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
