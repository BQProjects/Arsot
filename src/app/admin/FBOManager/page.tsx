"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "../../components/AdminHeader";
import Image from "next/image";

interface FBOManager {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  about: string;
  photo?: string;
}

const FboManagerAdminScreen = () => {
  const [managers, setManagers] = useState<FBOManager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    about: "",
    photo: null as File | null,
    photoUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingManager, setEditingManager] = useState<FBOManager | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await fetch("/api/fbo-managers");
      if (response.ok) {
        const data = await response.json();
        setManagers(data);
      }
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fbo-managers");
    formData.append("folder", "fbo-managers");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dszb0cmnk/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Cloudinary upload failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          `Upload failed: ${
            errorData.error?.message || response.statusText || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = "";
      if (formData.photo) {
        photoUrl = await uploadToCloudinary(formData.photo);
      }

      const response = await fetch(
        isEditing
          ? `/api/fbo-managers/${editingManager!._id}`
          : "/api/fbo-managers",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            location: formData.location,
            about: formData.about,
            photo: photoUrl,
          }),
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          location: "",
          about: "",
          photo: null,
          photoUrl: "",
        });
        setIsEditing(false);
        setEditingManager(null);
        setIsModalOpen(false);
        fetchManagers();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          `Failed to ${isEditing ? "update" : "add"} manager:`,
          errorData
        );
        alert(
          `Failed to ${isEditing ? "update" : "add"} manager: ${
            errorData.error || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (manager: FBOManager) => {
    setEditingManager(manager);
    setFormData({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      role: manager.role,
      location: manager.location,
      about: manager.about,
      photo: null,
      photoUrl: manager.photo || "",
    });
    setIsEditing(true);
    setIsModalOpen(true);
    // Scroll to form
    document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingManager(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      location: "",
      about: "",
      photo: null,
      photoUrl: "",
    });
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this manager?")) return;

    try {
      const response = await fetch(`/api/fbo-managers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchManagers();
      }
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="relative ">
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

        <div className="relative z-10 pt-12 px-14">
          <div className="max-w-7xl mx-auto">
            {/* FBO Managers List */}
            <div className="pb-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%]">
                  FBO Managers
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-[#f90] hover:bg-[#e68a00] transition-colors disabled:opacity-50"
                >
                  <span className="text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                    Add
                  </span>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.44616 16.3366L12.2099 10.4803C12.3363 10.3525 12.4072 10.18 12.4072 10.0003C12.4072 9.82057 12.3363 9.64808 12.2099 9.52031L6.44741 3.66281C6.32107 3.53424 6.25027 3.36119 6.25027 3.18093C6.25027 3.00067 6.32107 2.82763 6.44741 2.69906C6.50914 2.63575 6.58291 2.58543 6.66438 2.55008C6.74585 2.51672 6.83337 2.49902 6.92179 2.49902C7.01021 2.49902 7.09773 2.51672 7.1792 2.55008C7.26067 2.58543 7.33444 2.63575 7.39616 2.69906L13.1587 8.55406C13.5373 8.93971 13.7495 9.45859 13.7495 9.99906C13.7495 10.5395 13.5373 11.0584 13.1587 11.4441L7.39616 17.2991C7.33442 17.3626 7.26058 17.413 7.17899 17.4475C7.0974 17.482 7.00973 17.4997 6.92116 17.4997C6.8326 17.4997 6.74492 17.482 6.66334 17.4475C6.58175 17.413 6.5079 17.3626 6.44616 17.2991C6.31982 17.1705 6.24902 16.9974 6.24902 16.8172C6.24902 16.6369 6.31982 16.4639 6.44616 16.3353"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              {isLoading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                <div className="flex flex-col justify-center items-start gap-0.5 p-2 w-full border border-neutral-700 bg-black rounded-lg overflow-hidden">
                  {/* Header Row */}
                  <div className="flex justify-evenly items-center gap-0.5 self-stretch py-2 px-4 h-16 border-b border-b-[#2e2e2e] bg-[#2e2e2e]">
                    <div className="flex items-center gap-2 p-2 w-36">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Name
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-50">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Email Address
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-44">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Phone Number
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-40">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Role
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-40">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Location
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-45">
                      <span className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        About
                      </span>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.16667 0.833008V10.1663M6.16667 10.1663L10.8333 5.49967M6.16667 10.1663L1.5 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-8"></div>
                  </div>

                  {/* Manager Rows */}
                  {managers.length === 0 ? (
                    <div className="flex justify-center items-center py-16 px-4 mx-auto">
                      <div className="text-center">
                        <div className="text-white/60 font-['Montserrat'] text-lg mb-2">
                          No FBO Managers Found
                        </div>
                        <div className="text-white/40 font-['Montserrat'] text-sm">
                          Add your first FBO manager using the form above
                        </div>
                      </div>
                    </div>
                  ) : (
                    managers.map((manager) => (
                      <div
                        key={manager._id}
                        className="flex justify-evenly items-center gap-0.5 self-stretch py-2 px-4 border-b border-b-[#2e2e2e] hover:bg-white/5"
                      >
                        <div className="flex items-start gap-2 p-2 w-36">
                          <span className="text-white font-['Montserrat'] leading-[160%]">
                            {manager.name}
                          </span>
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-50 text-white font-['Montserrat'] leading-[160%]">
                          {manager.email}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-44 text-white font-['Montserrat'] leading-[160%]">
                          {manager.phone}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-40 text-white font-['Montserrat'] leading-[160%]">
                          {manager.role}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-40 text-white font-['Montserrat'] leading-[160%]">
                          {manager.location}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-45 text-white font-['Montserrat'] leading-[160%]">
                          {manager.about}
                        </div>
                        <div className="flex items-center gap-2 p-2 w-8">
                          <button
                            onClick={() => handleEdit(manager)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <svg
                              width={17}
                              height={16}
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.5 13.5H14.5M4.275 8.217L10.492 2L12.614 4.121L6.397 10.338L3.83 10.894L4.275 8.217Z"
                                stroke="#8C8C8C"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(manager._id)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <svg
                              width={17}
                              height={16}
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.83366 14V4H3.16699V2.66667H6.50033V2H10.5003V2.66667H13.8337V4H13.167V14H3.83366ZM5.16699 12.6667H11.8337V4H5.16699V12.6667ZM6.50033 11.3333H7.83366V5.33333H6.50033V11.3333ZM9.16699 11.3333H10.5003V5.33333H9.16699V11.3333Z"
                                fill="#8C8C8C"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-neutral-700 rounded-lg p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-white font-['PlayfairDisplay'] text-[2.5rem] leading-[120%]">
                {isEditing ? "Edit FBO Manager" : "Add FBO Manager"}
              </h1>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-400 text-2xl"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-10 py-10 px-6 w-full"
            >
              <div
                className="flex flex-col justify-center items-center gap-2 h-45 w-45 bg-[#d9d9d9] rounded cursor-pointer relative group"
                onClick={openFilePicker}
              >
                {formData.photo || formData.photoUrl ? (
                  <div className="relative justify-center items-center w-full h-full">
                    <Image
                      src={
                        formData.photo
                          ? URL.createObjectURL(formData.photo)
                          : formData.photoUrl
                      }
                      fill
                      alt="Profile preview"
                      className="rounded object-cover"
                    />
                    <div className="absolute inset-0 bg-[#AFAFAF] opacity-0 hover:opacity-80 transition-opacity duration-300 rounded flex flex-col items-center justify-center">
                      <label
                        className="w-24 text-black text-center items-center font-medium font-['Montserrat'] text-xs leading-[150%] cursor-pointer"
                        onClick={openFilePicker}
                      >
                        Click to change photo
                      </label>
                      <svg
                        width={17}
                        height={16}
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 13.5H14.5M4.275 8.217L10.492 2L12.614 4.121L6.397 10.338L3.83 10.894L4.275 8.217Z"
                          stroke="#000000"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      className="w-24 text-[#020b1a] text-center items-center font-['Montserrat'] text-xs leading-[150%] cursor-pointer"
                      onClick={openFilePicker}
                    >
                      Click to upload photo
                    </label>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2204 20.7503H5.78043C5.43365 20.7362 5.09305 20.6538 4.77814 20.5079C4.46323 20.3619 4.18018 20.1554 3.94519 19.8999C3.7102 19.6445 3.52788 19.3453 3.40867 19.0193C3.28945 18.6933 3.23568 18.3471 3.25043 18.0003V15.0003C3.25043 14.8014 3.32945 14.6106 3.4701 14.47C3.61075 14.3293 3.80152 14.2503 4.00043 14.2503C4.19934 14.2503 4.39011 14.3293 4.53076 14.47C4.67141 14.6106 4.75043 14.8014 4.75043 15.0003V18.0003C4.72461 18.2972 4.81407 18.5927 5.00026 18.8255C5.18645 19.0582 5.45508 19.2103 5.75043 19.2503H18.2204C18.5158 19.2103 18.7844 19.0582 18.9706 18.8255C19.1568 18.5927 19.2463 18.2972 19.2204 18.0003V15.0003C19.2204 14.8014 19.2995 14.6106 19.4401 14.47C19.5808 14.3293 19.7715 14.2503 19.9704 14.2503C20.1693 14.2503 20.3601 14.3293 20.5008 14.47C20.6414 14.6106 20.7204 14.8014 20.7204 15.0003V18.0003C20.7504 18.6957 20.5045 19.3748 20.0363 19.8898C19.5681 20.4048 18.9155 20.7141 18.2204 20.7503ZM16.0004 8.75032C15.9019 8.75078 15.8043 8.73156 15.7132 8.69378C15.6222 8.656 15.5397 8.60043 15.4704 8.53032L12.0004 5.06032L8.53043 8.53032C8.38826 8.6628 8.20021 8.73492 8.00591 8.73149C7.81161 8.72806 7.62622 8.64935 7.48881 8.51194C7.3514 8.37453 7.27269 8.18914 7.26926 7.99484C7.26583 7.80054 7.33795 7.61249 7.47043 7.47032L11.4704 3.47032C11.6111 3.32987 11.8017 3.25098 12.0004 3.25098C12.1992 3.25098 12.3898 3.32987 12.5304 3.47032L16.5304 7.47032C16.6709 7.61094 16.7498 7.80157 16.7498 8.00032C16.7498 8.19907 16.6709 8.38969 16.5304 8.53032C16.4612 8.60043 16.3786 8.656 16.2876 8.69378C16.1966 8.73156 16.099 8.75078 16.0004 8.75032Z"
                        fill="#020B1A"
                      />
                      <path
                        d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z"
                        fill="#020B1A"
                      />
                    </svg>
                  </>
                )}
                {/* Hidden file input - always rendered */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="flex items-start gap-2.5 self-stretch p-4 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                  placeholder="Name"
                />
              </div>

              <div className="flex w-full gap-10">
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="flex items-center p-4 w-full h-11 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                    placeholder="Email ID"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex items-center gap-2.5 p-4 w-full h-11 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center gap-10 self-stretch">
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="flex items-center p-4 w-full h-11 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                    placeholder="Role"
                  />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                  <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="flex items-center gap-2.5 p-4 w-full h-11 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                    placeholder="Choose Location"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 self-stretch">
                <label className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  required
                  className="flex items-start gap-2.5 self-stretch p-4 h-32 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded resize-none"
                  placeholder="About the person"
                />
              </div>

              <div className="flex flex-col items-end gap-2.5 w-full">
                <div className="flex gap-4">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-gray-600 hover:bg-gray-700 transition-colors rounded"
                    >
                      <span className="text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                        Cancel
                      </span>
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex justify-center items-center gap-3 py-3 px-6 h-14 bg-[#f90] hover:bg-[#e68a00] transition-colors rounded disabled:opacity-50"
                  >
                    <span className="text-white font-['Montserrat'] font-medium leading-[120%] uppercase">
                      {isSubmitting
                        ? isEditing
                          ? "Updating..."
                          : "Adding..."
                        : isEditing
                        ? "Update"
                        : "Add"}
                    </span>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.44616 16.3366L12.2099 10.4803C12.3363 10.3525 12.4072 10.18 12.4072 10.0003C12.4072 9.82057 12.3363 9.64808 12.2099 9.52031L6.44741 3.66281C6.32107 3.53424 6.25027 3.36119 6.25027 3.18093C6.25027 3.00067 6.32107 2.82763 6.44741 2.69906C6.50914 2.63575 6.58291 2.58543 6.66438 2.55008C6.74585 2.51672 6.83337 2.49902 6.92179 2.49902C7.01021 2.49902 7.09773 2.51672 7.1792 2.55008C7.26067 2.58543 7.33444 2.63575 7.39616 2.69906L13.1587 8.55406C13.5373 8.93971 13.7495 9.45859 13.7495 9.99906C13.7495 10.5395 13.5373 11.0584 13.1587 11.4441L7.39616 17.2991C7.33442 17.3626 7.26058 17.413 7.17899 17.4475C7.0974 17.482 7.00973 17.4997 6.92116 17.4997C6.8326 17.4997 6.74492 17.482 6.66334 17.4475C6.58175 17.413 6.5079 17.3626 6.44616 17.2991C6.31982 17.1705 6.24902 16.9974 6.24902 16.8172C6.24902 16.6369 6.31982 16.4639 6.44616 16.3353"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FboManagerAdminScreen;
