"use client";

import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "../../components/AdminHeader";
import Image from "next/image";

interface CrewBriefSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
}

interface CrewBrief {
  _id: string;
  title: string;
  date: string;
  banner?: string;
  sections: CrewBriefSection[];
  summary?: string;
  createdAt: string;
}

const CrewBriefAdminScreen = () => {
  const [briefs, setBriefs] = useState<CrewBrief[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    banner: null as File | null,
    bannerUrl: "",
    sections: [] as CrewBriefSection[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBrief, setEditingBrief] = useState<CrewBrief | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [showAddMenuIndex, setShowAddMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchBriefs();
  }, []);

  const fetchBriefs = async () => {
    try {
      const response = await fetch("/api/crew-briefs");
      if (response.ok) {
        const data = await response.json();
        setBriefs(data);
      }
    } catch (error) {
      console.error("Error fetching briefs:", error);
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

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, banner: file }));
    }
  };

  const handleSectionChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleSectionImageChange = (
    index: number,
    file: File | null,
    side: "left" | "right"
  ) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      // For simplicity, store the file, but in real app, upload immediately or on submit
      setFormData((prev) => ({
        ...prev,
        sections: prev.sections.map((section, i) =>
          i === index
            ? {
                ...section,
                [side === "left" ? "leftImage" : "rightImage"]:
                  URL.createObjectURL(file),
              }
            : section
        ),
      }));
    }
  };

  const addSection = (
    type: "heading" | "paragraph" | "quote" | "image",
    insertIndex?: number
  ) => {
    const newSection = {
      type,
      content: type === "image" ? undefined : "",
      image: type === "image" ? "" : undefined,
      leftImage: type === "image" ? "" : undefined,
      rightImage: type === "image" ? "" : undefined,
    };
    setFormData((prev) => ({
      ...prev,
      sections:
        insertIndex !== undefined
          ? [
              ...prev.sections.slice(0, insertIndex),
              newSection,
              ...prev.sections.slice(insertIndex),
            ]
          : [...prev.sections, newSection],
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const openBannerPicker = () => {
    bannerInputRef.current?.click();
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "crew-briefs");
    formData.append("folder", "crew-briefs");

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
        throw new Error(
          `Upload failed: ${errorData.error?.message || response.statusText}`
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
      let bannerUrl = "";
      if (formData.banner) {
        bannerUrl = await uploadToCloudinary(formData.banner);
      }

      // Upload section images
      const sectionsWithUrls = await Promise.all(
        formData.sections.map(async (section) => {
          const updatedSection = { ...section };
          if (section.type === "image") {
            // Remove content field for image sections
            delete updatedSection.content;
            if (section.leftImage && section.leftImage.startsWith("blob:")) {
              // Upload left image
              // Note: In real implementation, you'd need to store the file reference
              // For now, assume it's already uploaded or handle differently
              updatedSection.leftImage = section.leftImage; // Placeholder
            }
            if (section.rightImage && section.rightImage.startsWith("blob:")) {
              // Upload right image
              updatedSection.rightImage = section.rightImage; // Placeholder
            }
          }
          return updatedSection;
        })
      );

      const response = await fetch(
        isEditing
          ? `/api/crew-briefs/${editingBrief!._id}`
          : "/api/crew-briefs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            date: formData.date,
            banner: bannerUrl,
            sections: sectionsWithUrls,
          }),
        }
      );

      if (response.ok) {
        setFormData({
          title: "",
          date: "",
          banner: null,
          bannerUrl: "",
          sections: [],
        });
        setIsEditing(false);
        setEditingBrief(null);
        fetchBriefs();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          `Failed to ${isEditing ? "update" : "save"} crew brief: ${
            errorData.error || response.statusText
          }`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (brief: CrewBrief) => {
    setEditingBrief(brief);
    setFormData({
      title: brief.title,
      date: brief.date,
      banner: null,
      bannerUrl: brief.banner || "",
      sections: brief.sections,
    });
    setIsEditing(true);
    document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingBrief(null);
    setFormData({
      title: "",
      date: "",
      banner: null,
      bannerUrl: "",
      sections: [],
    });
    setIsEditing(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this crew brief?")) return;

    try {
      const response = await fetch(`/api/crew-briefs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBriefs();
      }
    } catch (error) {
      console.error("Error deleting brief:", error);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <AdminHeader />
      </div>

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

        <div className="relative z-10 pt-24 px-14">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h1 className="text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%] mb-8">
                {isEditing ? "Edit Crew Brief" : "Create Crew Brief"}
              </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-10 py-10 px-6 w-full border border-neutral-700 rounded-lg"
              >
                <div
                  className="flex flex-col justify-center items-center gap-2 self-stretch py-9 px-0 bg-[#b3b3b3]"
                  onClick={openBannerPicker}
                >
                  {formData.banner || formData.bannerUrl ? (
                    <div
                      className="relative w-full h-32"
                      onClick={openBannerPicker}
                    >
                      <Image
                        src={
                          formData.banner
                            ? URL.createObjectURL(formData.banner)
                            : formData.bannerUrl
                        }
                        fill
                        alt="Banner preview"
                        className="object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-center justify-center">
                        <button type="button" className="text-white">
                          Change Banner
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-[6.125rem] text-black text-center font-['Montserrat'] text-xs leading-[150%] cursor-pointer flex flex-col items-center justify-center gap-2">
                        <span>Click to upload banner</span>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.2204 20.7503H5.78043C5.43365 20.7362 5.09305 20.6538 4.77814 20.5079C4.46323 20.3619 4.18018 20.1554 3.94519 19.8999C3.7102 19.6445 3.52788 19.3453 3.40867 19.0193C3.28945 18.6933 3.23568 18.3471 3.25043 18.0003V15.0003C3.25043 14.8014 3.32945 14.6106 3.4701 14.47C3.61075 14.3293 3.80152 14.2503 4.00043 14.2503C4.19934 14.2503 4.39011 14.3293 4.53076 14.47C4.67141 14.6106 4.75043 14.8014 4.75043 15.0003V18.0003C4.72461 18.2972 4.81407 18.5927 5.00026 18.8255C5.18645 19.0582 5.45508 19.2103 5.75043 19.2503H18.2204C18.5158 19.2103 18.7844 19.0582 18.9706 18.8255C19.1568 18.5927 19.2463 18.2972 19.2204 18.0003V15.0003C19.2204 14.8014 19.2995 14.6106 19.4401 14.47C19.5808 14.3293 19.7715 14.2503 19.9704 14.2503C20.1693 14.2503 20.3601 14.3293 20.5008 14.47C20.6414 14.6106 20.7204 14.8014 20.7204 15.0003V18.0003C20.7504 18.6957 20.5045 19.3748 20.0363 19.8898C19.5681 20.4048 18.9155 20.7141 18.2204 20.7503ZM16.0004 8.75032C15.9019 8.75078 15.8043 8.73156 15.7132 8.69378C15.6222 8.656 15.5397 8.60043 15.4704 8.53032L12.0004 5.06032L8.53043 8.53032C8.38826 8.6628 8.20021 8.73492 8.00591 8.73149C7.81161 8.72806 7.62622 8.64935 7.48881 8.51194C7.3514 8.37453 7.27269 8.18914 7.26926 7.99484C7.26583 7.80054 7.33795 7.61249 7.47043 7.47032L11.4704 3.47032C11.6111 3.32987 11.8017 3.25098 12.0004 3.25098C12.1992 3.25098 12.3898 3.32987 12.5304 3.47032L16.5304 7.47032C16.6709 7.61094 16.7498 7.80157 16.7498 8.00032C16.7498 8.19907 16.6709 8.38969 16.5304 8.53032C16.4612 8.60043 16.3786 8.656 16.2876 8.69378C16.1966 8.73156 16.099 8.75078 16.0004 8.75032Z"
                            fill="black"
                          />
                          <path
                            d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                  <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                  />
                </div>

                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Title
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="flex items-start gap-2.5 self-stretch p-4 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                    placeholder="Title"
                  />
                </div>

                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                    Date
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="flex items-start gap-2.5 self-stretch p-4 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded"
                  />
                </div>

                {formData.sections.map((section, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-end gap-2 self-stretch"
                  >
                    <div className="flex justify-between items-center self-stretch">
                      <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                        {section.type.charAt(0).toUpperCase() +
                          section.type.slice(1)}{" "}
                        {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="mdi_remove flex justify-center items-center pt-[0.3125rem] pr-[0.3125rem] pb-[0.3125rem] pl-[0.3125rem] w-6 h-6"
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                            fill="#FF383C"
                          />
                        </svg>
                      </button>
                    </div>
                    {section.type === "image" ? (
                      <div className="flex gap-4 self-stretch">
                        {/* Left Image */}
                        <div
                          className="flex-1 flex justify-center items-center pt-[1.6875rem] pb-[1.6875rem] p-4 h-32 bg-[#b3b3b3] cursor-pointer rounded"
                          onClick={() =>
                            document
                              .getElementById(`left-image-input-${index}`)
                              ?.click()
                          }
                        >
                          {section.leftImage ? (
                            <Image
                              src={section.leftImage}
                              width={120}
                              height={80}
                              alt="Left section image"
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex flex-col justify-center items-center gap-2">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.2204 20.7503H5.78043C5.43365 20.7362 5.09305 20.6538 4.77814 20.5079C4.46323 20.3619 4.18018 20.1554 3.94519 19.8999C3.7102 19.6445 3.52788 19.3453 3.40867 19.0193C3.28945 18.6933 3.23568 18.3471 3.25043 18.0003V15.0003C3.25043 14.8014 3.32945 14.6106 3.4701 14.47C3.61075 14.3293 3.80152 14.2503 4.00043 14.2503C4.19934 14.2503 4.39011 14.3293 4.53076 14.47C4.67141 14.6106 4.75043 14.8014 4.75043 15.0003V18.0003C4.72461 18.2972 4.81407 18.5927 5.00026 18.8255C5.18645 19.0582 5.45508 19.2103 5.75043 19.2503H18.2204C18.5158 19.2103 18.7844 19.0582 18.9706 18.8255C19.1568 18.5927 19.2463 18.2972 19.2204 18.0003V15.0003C19.2204 14.8014 19.2995 14.6106 19.4401 14.47C19.5808 14.3293 19.7715 14.2503 19.9704 14.2503C20.1693 14.2503 20.3601 14.3293 20.5008 14.47C20.6414 14.6106 20.7204 14.8014 20.7204 15.0003V18.0003C20.7504 18.6957 20.5045 19.3748 20.0363 19.8898C19.5681 20.4048 18.9155 20.7141 18.2204 20.7503ZM16.0004 8.75032C15.9019 8.75078 15.8043 8.73156 15.7132 8.69378C15.6222 8.656 15.5397 8.60043 15.4704 8.53032L12.0004 5.06032L8.53043 8.53032C8.38826 8.6628 8.20021 8.73492 8.00591 8.73149C7.81161 8.72806 7.62622 8.64935 7.48881 8.51194C7.3514 8.37453 7.27269 8.18914 7.26926 7.99484C7.26583 7.80054 7.33795 7.61249 7.47043 7.47032L11.4704 3.47032C11.6111 3.32987 11.8017 3.25098 12.0004 3.25098C12.1992 3.25098 12.3898 3.32987 12.5304 3.47032L16.5304 7.47032C16.6709 7.61094 16.7498 7.80157 16.7498 8.00032C16.7498 8.19907 16.6709 8.38969 16.5304 8.53032C16.4612 8.60043 16.3786 8.656 16.2876 8.69378C16.1966 8.73156 16.099 8.75078 16.0004 8.75032Z"
                                  fill="black"
                                />
                                <path
                                  d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z"
                                  fill="black"
                                />
                              </svg>
                              <div className="text-black font-['Montserrat'] text-xs leading-[160%] text-center">
                                Upload Left Image
                              </div>
                            </div>
                          )}
                          <input
                            id={`left-image-input-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleSectionImageChange(
                                  index,
                                  e.target.files[0],
                                  "left"
                                );
                              }
                            }}
                            className="hidden"
                          />
                        </div>

                        {/* Right Image */}
                        <div
                          className="flex-1 flex justify-center items-center pt-[1.6875rem] pb-[1.6875rem] p-4 h-32 bg-[#b3b3b3] cursor-pointer rounded"
                          onClick={() =>
                            document
                              .getElementById(`right-image-input-${index}`)
                              ?.click()
                          }
                        >
                          {section.rightImage ? (
                            <Image
                              src={section.rightImage}
                              width={120}
                              height={80}
                              alt="Right section image"
                              className="object-cover rounded"
                            />
                          ) : (
                            <div className="flex flex-col justify-center items-center gap-2">
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.2204 20.7503H5.78043C5.43365 20.7362 5.09305 20.6538 4.77814 20.5079C4.46323 20.3619 4.18018 20.1554 3.94519 19.8999C3.7102 19.6445 3.52788 19.3453 3.40867 19.0193C3.28945 18.6933 3.23568 18.3471 3.25043 18.0003V15.0003C3.25043 14.8014 3.32945 14.6106 3.4701 14.47C3.61075 14.3293 3.80152 14.2503 4.00043 14.2503C4.19934 14.2503 4.39011 14.3293 4.53076 14.47C4.67141 14.6106 4.75043 14.8014 4.75043 15.0003V18.0003C4.72461 18.2972 4.81407 18.5927 5.00026 18.8255C5.18645 19.0582 5.45508 19.2103 5.75043 19.2503H18.2204C18.5158 19.2103 18.7844 19.0582 18.9706 18.8255C19.1568 18.5927 19.2463 18.2972 19.2204 18.0003V15.0003C19.2204 14.8014 19.2995 14.6106 19.4401 14.47C19.5808 14.3293 19.7715 14.2503 19.9704 14.2503C20.1693 14.2503 20.3601 14.3293 20.5008 14.47C20.6414 14.6106 20.7204 14.8014 20.7204 15.0003V18.0003C20.7504 18.6957 20.5045 19.3748 20.0363 19.8898C19.5681 20.4048 18.9155 20.7141 18.2204 20.7503ZM16.0004 8.75032C15.9019 8.75078 15.8043 8.73156 15.7132 8.69378C15.6222 8.656 15.5397 8.60043 15.4704 8.53032L12.0004 5.06032L8.53043 8.53032C8.38826 8.6628 8.20021 8.73492 8.00591 8.73149C7.81161 8.72806 7.62622 8.64935 7.48881 8.51194C7.3514 8.37453 7.27269 8.18914 7.26926 7.99484C7.26583 7.80054 7.33795 7.61249 7.47043 7.47032L11.4704 3.47032C11.6111 3.32987 11.8017 3.25098 12.0004 3.25098C12.1992 3.25098 12.3898 3.32987 12.5304 3.47032L16.5304 7.47032C16.6709 7.61094 16.7498 7.80157 16.7498 8.00032C16.7498 8.19907 16.6709 8.38969 16.5304 8.53032C16.4612 8.60043 16.3786 8.656 16.2876 8.69378C16.1966 8.73156 16.099 8.75078 16.0004 8.75032Z"
                                  fill="black"
                                />
                                <path
                                  d="M12 15.75C11.8019 15.7474 11.6126 15.6676 11.4725 15.5275C11.3324 15.3874 11.2526 15.1981 11.25 15V4C11.25 3.80109 11.329 3.61032 11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5303 3.46967C12.671 3.61032 12.75 3.80109 12.75 4V15C12.7474 15.1981 12.6676 15.3874 12.5275 15.5275C12.3874 15.6676 12.1981 15.7474 12 15.75Z"
                                  fill="black"
                                />
                              </svg>
                              <div className="text-black font-['Montserrat'] text-xs leading-[160%] text-center">
                                Upload Right Image
                              </div>
                            </div>
                          )}
                          <input
                            id={`right-image-input-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleSectionImageChange(
                                  index,
                                  e.target.files[0],
                                  "right"
                                );
                              }
                            }}
                            className="hidden"
                          />
                        </div>
                      </div>
                    ) : (
                      <textarea
                        value={section.content || ""}
                        onChange={(e) =>
                          handleSectionChange(index, "content", e.target.value)
                        }
                        className={`flex items-start gap-2.5 self-stretch p-4 border border-[#d9d9d9] text-white font-['Montserrat'] leading-[160%] bg-transparent rounded ${
                          section.type === "heading"
                            ? "h-[3.625rem]"
                            : "h-[6.5rem]"
                        } resize-none`}
                        placeholder={
                          section.type === "quote" ? "Your quote" : section.type
                        }
                      />
                    )}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowAddMenuIndex(
                            showAddMenuIndex === index ? null : index
                          )
                        }
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 3H3V21H21V3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                            fill="#FF9900"
                          />
                        </svg>
                      </button>
                      {showAddMenuIndex === index && (
                        <div className="absolute top-full mt-2 bg-black border border-neutral-700 rounded-lg shadow-lg z-10 min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => {
                              addSection("heading", index + 1);
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Heading
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("paragraph", index + 1);
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Paragraph
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("quote", index + 1);
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("image", index + 1);
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm"
                          >
                            Add Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add first section button when no sections exist */}
                {formData.sections.length === 0 && (
                  <div className="flex flex-col items-center gap-4 self-stretch py-8">
                    <div className="text-[#d9d9d9] font-['Montserrat'] text-sm leading-[150%]">
                      No sections added yet
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowAddMenuIndex(
                            showAddMenuIndex === -1 ? null : -1
                          )
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-[#f90] hover:bg-[#e68a00] text-white font-['Montserrat'] font-medium rounded transition-colors"
                      >
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 3H3V21H21V3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                            fill="white"
                          />
                        </svg>
                        Add First Section
                      </button>
                      {showAddMenuIndex === -1 && (
                        <div className="absolute top-full mt-2 bg-black border border-neutral-700 rounded-lg shadow-lg z-10 min-w-[200px]">
                          <button
                            type="button"
                            onClick={() => {
                              addSection("heading");
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Heading
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("paragraph");
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Paragraph
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("quote");
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm border-b border-gray-600 last:border-b-0"
                          >
                            Add Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addSection("image");
                              setShowAddMenuIndex(null);
                            }}
                            className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 font-['Montserrat'] uppercase text-sm"
                          >
                            Add Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-end gap-2.5 w-[1134px]">
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
                            : "Creating..."
                          : isEditing
                          ? "Update"
                          : "Create"}
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

            <div className="pb-10">
              <h2 className="text-white font-['PlayfairDisplay'] text-[3.5rem] leading-[120%] mb-8">
                Manage Crew Briefs
              </h2>
              {isLoading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                <div className="flex flex-col justify-center items-start gap-0.5 p-2 w-full border border-neutral-700 bg-black rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center self-stretch py-2 px-4 h-[3.9375rem] border-b border-b-[#2e2e2e] bg-[#2e2e2e]">
                    <div className="flex items-center gap-2 p-2 w-60">
                      <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Title
                      </div>
                      <svg
                        width={11}
                        height={11}
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.66667 0.833008V10.1663M5.66667 10.1663L10.3333 5.49967M5.66667 10.1663L1 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-[9.75rem]">
                      <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Date created
                      </div>
                      <svg
                        width={12}
                        height={11}
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99967 0.833008V10.1663M5.99967 10.1663L10.6663 5.49967M5.99967 10.1663L1.33301 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 p-2 w-[500px]">
                      <div className="text-white font-['Montserrat'] text-sm leading-[150%]">
                        Summary
                      </div>
                      <svg
                        width={11}
                        height={11}
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.33366 0.833008V10.1663M5.33366 10.1663L10.0003 5.49967M5.33366 10.1663L0.666992 5.49967"
                          stroke="white"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-center items-center gap-2 p-2 w-24 text-white font-['Montserrat'] text-sm leading-[150%]">
                      Actions
                    </div>
                  </div>

                  {briefs.length === 0 ? (
                    <div className="flex justify-center items-center py-16 px-4 mx-auto">
                      <div className="text-center">
                        <div className="text-white/60 font-['Montserrat'] text-lg mb-2">
                          No Crew Briefs Found
                        </div>
                        <div className="text-white/40 font-['Montserrat'] text-sm">
                          Create your first crew brief using the form above
                        </div>
                      </div>
                    </div>
                  ) : (
                    briefs.map((brief) => (
                      <div
                        key={brief._id}
                        className="flex justify-between items-center self-stretch py-2 px-4 border-b border-b-[#2e2e2e]"
                      >
                        <div className="flex flex-col items-start gap-2 p-2 w-60 text-white font-['Montserrat'] leading-[160%]">
                          {brief.title}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-[9.75rem] text-white font-['Montserrat'] leading-[160%]">
                          {new Date(brief.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex flex-col items-start gap-2 p-2 w-[500px] text-white font-['Montserrat'] leading-[160%]">
                          {brief.summary || "No summary"}
                        </div>
                        <div className="flex items-center gap-2 p-2">
                          <button
                            onClick={() => handleEdit(brief)}
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
                            onClick={() => handleDelete(brief._id)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.33366 14V4H2.66699V2.66667H6.00033V2H10.0003V2.66667H13.3337V4H12.667V14H3.33366ZM4.66699 12.6667H11.3337V4H4.66699V12.6667ZM6.00033 11.3333H7.33366V5.33333H6.00033V11.3333ZM8.66699 11.3333H10.0003V5.33333H8.66699V11.3333Z"
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
    </div>
  );
};

export default CrewBriefAdminScreen;
