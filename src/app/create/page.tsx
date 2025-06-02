"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, ImageIcon, FileText, Type, AlignLeft, Send, AlertCircle } from "lucide-react"

interface FormErrors {
    title?: string
    description?: string
    shortDescription?: string
    image?: string
    general?: string
}

export default function CreatePost() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        shortDescription: "",
        image: null as File | null,
    })
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const validateImageFormat = (file: File): boolean => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"]
        return allowedTypes.includes(file.type.toLowerCase())
    }

    const validateField = (name: string, value: string | File | null): string | undefined => {
        switch (name) {
            case "title":
                if (!value || (typeof value === "string" && value.trim().length === 0)) {
                    return "Title is required"
                }
                if (typeof value === "string" && value.trim().length < 5) {
                    return "Title must be at least 5 characters long"
                }
                break
            case "description":
                if (!value || (typeof value === "string" && value.trim().length === 0)) {
                    return "Description is required"
                }
                if (typeof value === "string" && value.trim().length < 20) {
                    return "Description must be at least 20 characters long"
                }
                break
            case "shortDescription":
                if (!value || (typeof value === "string" && value.trim().length === 0)) {
                    return "Short description is required"
                }
                if (typeof value === "string" && value.trim().length < 10) {
                    return "Short description must be at least 10 characters long"
                }
                break
            case "image":
                if (!value) {
                    return "Featured image is required"
                }
                if (value instanceof File && !validateImageFormat(value)) {
                    return "Only PNG, JPG, and JPEG formats are allowed"
                }
                break
        }
        return undefined
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Validate field on change
        const error = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: error, general: undefined }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            // Validate image format
            const error = validateField("image", file)
            if (error) {
                setErrors((prev) => ({ ...prev, image: error }))
                setFormData((prev) => ({ ...prev, image: null }))
                setPreviewUrl(null)
                return
            }

            setFormData((prev) => ({ ...prev, image: file }))
            setErrors((prev) => ({ ...prev, image: undefined }))

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const validateAllFields = (): boolean => {
        const newErrors: FormErrors = {}

        newErrors.title = validateField("title", formData.title)
        newErrors.description = validateField("description", formData.description)
        newErrors.shortDescription = validateField("shortDescription", formData.shortDescription)
        newErrors.image = validateField("image", formData.image)

        setErrors(newErrors)

        return !Object.values(newErrors).some((error) => error !== undefined)
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAllFields()) {
            setErrors((prev) => ({ ...prev, general: "Please fix all errors before submitting" }));
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No authentication token found. Please log in.");

            // Prepare FormData
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title.trim());
            formDataToSend.append("description", formData.description.trim());
            formDataToSend.append("shortDescription", formData.shortDescription.trim());

            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            const response = await fetch("http://localhost:9090/api/blog", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }


            setFormData({
                title: "",
                description: "",
                shortDescription: "",
                image: null,
            });
            setPreviewUrl(null);
            setSuccessModalOpen(true);
        } catch (err) {
            console.error("Error creating post:", err);
            setErrors({ general: err instanceof Error ? err.message : "Failed to create post. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };


    const ErrorMessage = ({ error }: { error?: string }) => {
        if (!error) return null
        return (
            <div className="flex items-center gap-2 mt-1 text-red-600 text-xs">
                <AlertCircle className="w-3 h-3" />
                {error}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">


            {/* ✅ Success Modal */}
            {successModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 bg-opacity-50">
                    <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Success!</h2>
                        <p className="text-gray-700 mb-6">Your blog post has been created successfully.</p>
                        <button
                            onClick={() => {
                                setSuccessModalOpen(false);
                                window.location.reload();
                            }}

                            className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    {/* <button
                        onClick={() => router.push("/")}
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Adventures
                    </button> */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Adventure</h1>
                        <p className="text-lg text-gray-600">Share your trekking experience with the community</p>
                    </div>
                </div>

                {/* General Error Message */}
                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-red-700 text-sm">{errors.general}</p>
                        </div>
                    </div>
                )}

                {/* Main Form */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                        <h2 className="text-xl font-semibold text-white">Adventure Details</h2>
                        <p className="text-emerald-100 text-sm mt-1">Fill in the details of your amazing journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <Type className="w-4 h-4 text-emerald-600" />
                                Adventure Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                placeholder="Enter a captivating title for your adventure"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-200 transition-all outline-none ${errors.title ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                                    }`}
                            />
                            <ErrorMessage error={errors.title} />
                        </div>

                        {/* Short Description */}
                        <div className="space-y-2">
                            <label htmlFor="shortDescription" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <FileText className="w-4 h-4 text-emerald-600" />
                                Short Description *
                            </label>
                            <textarea
                                id="shortDescription"
                                name="shortDescription"
                                required
                                placeholder="Write a brief summary (for preview cards)"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                className={`w-full border-2 rounded-xl px-4 py-3 text-sm h-24 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none ${errors.shortDescription
                                    ? "border-red-300 focus:border-red-500"
                                    : "border-gray-200 focus:border-emerald-500"
                                    }`}
                            />
                            <ErrorMessage error={errors.shortDescription} />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <AlignLeft className="w-4 h-4 text-emerald-600" />
                                Detailed  Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Write a detailed description of your adventure"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`w-full border-2 rounded-xl px-4 py-3 text-sm h-32 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none ${errors.description
                                    ? "border-red-300 focus:border-red-500"
                                    : "border-gray-200 focus:border-emerald-500"
                                    }`}
                            />
                            <ErrorMessage error={errors.description} />
                        </div>



                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label htmlFor="image" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                <ImageIcon className="w-4 h-4 text-emerald-600" />
                                Featured Image *
                            </label>
                            <div
                                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${errors.image ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-emerald-400"
                                    }`}
                            >
                                {previewUrl ? (
                                    <div className="space-y-4">
                                        <div className="relative w-full h-64 rounded-lg shadow-md overflow-hidden">
                                            <Image
                                                src={previewUrl || "/placeholder.svg"}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm text-gray-600">Image selected successfully</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${errors.image ? "bg-red-100" : "bg-emerald-100"
                                                }`}
                                        >
                                            <Upload className={`w-8 h-8 ${errors.image ? "text-red-600" : "text-emerald-600"}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Upload your adventure photo</p>
                                            <p className="text-xs text-gray-500">PNG, JPG, JPEG only - up to 10MB</p>
                                        </div>
                                    </div>
                                )}
                                <input
                                    id="image"
                                    type="file"
                                    accept=".png,.jpg,.jpeg,"
                                    onChange={handleImageChange}
                                    className="w-full mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:cursor-pointer cursor-pointer"
                                />
                            </div>
                            <ErrorMessage error={errors.image} />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.replace("/blog")}
                                className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer shadow-sm hover:shadow-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Publish Adventure
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}
