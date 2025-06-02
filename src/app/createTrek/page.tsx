"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, ImageIcon } from "lucide-react"
import Image from "next/image"


export default function CreateTrekPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        shortDescription: "",
        longDescription: "",
        imageFile: null as File | null,
        duration: "",
        bestTimeToVisit: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            const validTypes = ["image/png", "image/jpeg", "image/jpg"]
            if (!validTypes.includes(file.type)) {
                setErrors((prev) => ({
                    ...prev,
                    imageFile: "Only PNG, JPG, and JPEG files are allowed.",
                }))
                setFormData((prev) => ({ ...prev, imageFile: null }))
                setImagePreview(null)
                return
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxSize) {
                setErrors((prev) => ({
                    ...prev,
                    imageFile: "File size must be less than 5MB.",
                }))
                setFormData((prev) => ({ ...prev, imageFile: null }))
                setImagePreview(null)
                return
            }

            setErrors((prev) => ({ ...prev, imageFile: "" }))
            setFormData((prev) => ({ ...prev, imageFile: file }))

            // Preview image
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, imageFile: null }))
        setImagePreview(null)
        setErrors((prev) => ({ ...prev, imageFile: "" }))
        // Reset file input
        const fileInput = document.getElementById("image") as HTMLInputElement
        if (fileInput) fileInput.value = ""
    }

    const validateFields = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) newErrors.name = "Trek Name is required"
        if (!formData.location.trim()) newErrors.location = "Location is required"
        if (!formData.shortDescription.trim()) newErrors.shortDescription = "Short Description is required"
        if (!formData.longDescription.trim()) newErrors.longDescription = "Long Description is required"
        if (!formData.duration.trim()) newErrors.duration = "Duration is required"
        if (!formData.bestTimeToVisit.trim()) newErrors.bestTimeToVisit = "Best Time to Visit is required"
        if (!formData.imageFile) newErrors.imageFile = "Image is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateFields()) {
            return
        }

        setIsSubmitting(true)

        try {
            const token = localStorage.getItem("token")
            const data = new FormData()
            data.append("name", formData.name)
            data.append("location", formData.location)
            data.append("shortDescription", formData.shortDescription)
            data.append("longDescription", formData.longDescription)
            data.append("duration", formData.duration)
            data.append("bestTimeToVisit", formData.bestTimeToVisit)
            if (formData.imageFile) {
                data.append("image", formData.imageFile)
            }

            const response = await fetch("http://localhost:9090/api/trek", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            })

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`)
            }

            await response.json()

            setSuccessModalOpen(true)
            setFormData({
                name: "",
                location: "",
                shortDescription: "",
                longDescription: "",
                imageFile: null,
                duration: "",
                bestTimeToVisit: "",
            })
            setImagePreview(null)
        } catch (error) {
            console.error("Error creating trek:", error)
            alert("Error creating trek. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (successModalOpen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 bg-opacity-50">
                <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-emerald-600 mb-4">Success!</h2>
                    <p className="text-gray-700 mb-6">Your trek has been created successfully.</p>
                    <button
                        onClick={() => {
                            setSuccessModalOpen(false)
                            window.location.reload()
                        }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">

                    <div className="text-center">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                            Create New Trek
                        </h1>
                        <p className="text-gray-600">Share your adventure with fellow trekkers</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
                        <h2 className="text-xl font-semibold text-white">Trek Details</h2>
                        <p className="text-emerald-100 text-sm mt-1">Fill in the information about your trek</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Trek Name & Location Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                        Trek Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        placeholder="Enter trek name"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.name
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        placeholder="e.g., Nepal, Himalayas"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.location
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700">Trek Image *</label>
                                <div className="relative">
                                    {!imagePreview ? (
                                        <div
                                            onClick={() => document.getElementById("image")?.click()}
                                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50 ${errors.imageFile ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-emerald-400"
                                                }`}
                                        >
                                            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-600 font-medium mb-2">Click to upload trek image</p>
                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-xl overflow-hidden border-2 border-emerald-200">
                                            <Image
                                                src={imagePreview || "/placeholder.svg"}
                                                alt="Trek preview"
                                                width={800} // replace with actual width
                                                height={256} // replace with actual height
                                                className="w-full h-64 object-cover"
                                                style={{ objectFit: "cover" }}
                                            />

                                            <div className="absolute inset-0 bg-gray bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200  cursor-pointer"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        id="image"
                                        type="file"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                                {errors.imageFile && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <X className="h-4 w-4" />
                                        {errors.imageFile}
                                    </p>
                                )}
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700">
                                        Short Description *
                                    </label>
                                    <textarea
                                        id="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                                        placeholder="Brief description of the trek (2-3 sentences)"
                                        rows={3}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 resize-none ${errors.shortDescription
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.shortDescription && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.shortDescription}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="longDescription" className="block text-sm font-semibold text-gray-700">
                                        Detailed Description *
                                    </label>
                                    <textarea
                                        id="longDescription"
                                        value={formData.longDescription}
                                        onChange={(e) => handleInputChange("longDescription", e.target.value)}
                                        placeholder="Detailed description of the trek experience, highlights, and what to expect"
                                        rows={5}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 resize-none ${errors.longDescription
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.longDescription && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.longDescription}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Duration & Best Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="duration" className="block text-sm font-semibold text-gray-700">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange("duration", e.target.value)}
                                        placeholder="e.g., 5 days, 2 weeks"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.duration
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.duration && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.duration}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="bestTimeToVisit" className="block text-sm font-semibold text-gray-700">
                                        Best Time to Visit *
                                    </label>
                                    <input
                                        type="text"
                                        id="bestTimeToVisit"
                                        value={formData.bestTimeToVisit}
                                        onChange={(e) => handleInputChange("bestTimeToVisit", e.target.value)}
                                        placeholder="e.g., March-May, September-November"
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-all duration-200 ${errors.bestTimeToVisit
                                            ? "border-red-300 focus:border-red-500 bg-red-50"
                                            : "border-gray-200 focus:border-emerald-500 hover:border-gray-300"
                                            }`}
                                    />
                                    {errors.bestTimeToVisit && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="h-4 w-4" />
                                            {errors.bestTimeToVisit}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => router.replace("/trek")}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Creating Trek...
                                        </span>
                                    ) : (
                                        "Create Trek"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
