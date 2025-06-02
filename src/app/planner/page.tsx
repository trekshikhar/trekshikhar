"use client"
import type React from "react"
import { useState } from "react"
import {  AlertCircle, CheckCircle, Plus } from "lucide-react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"

export default function TripPlanner() {
  const [form, setForm] = useState({
    trekId: "",
    budget: "",
    tripDays: "",
    location: "",
  })
  const [loading, setLoading] = useState(false)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isFormValid = () => form.trekId && form.budget && form.tripDays && form.location

  const fetchTripData = async () => {
    if (!isFormValid()) {
      setError("Please fill all fields")
      return
    }
    setLoading(true)
    setError(null)
    setResponseText(null)

    try {
      const res = await fetch("/api/trip-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const data = await res.json()

      if (data.text) {
        setResponseText(data.text)
        setShowForm(false) // Hide form when results are shown
        console.log("Trip data received:", data.text)
      } else if (data.error) {
        setError(data.error)
      } else {
        setError("Unexpected response format")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNewPlan = () => {
    window.location.href = "/planner"
  }

  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">


        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Form Section - only show when showForm is true */}
          {showForm && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ✈️ Trip Budget Planner
                </h1>
                <p className="text-gray-600 mt-1">Plan your perfect adventure within budget</p>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                  1
                </span>
                Trip Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🏔️ Trek Name</label>
                  <input
                    name="trekId"
                    value={form.trekId}
                    onChange={handleChange}
                    placeholder="e.g., Everest Base Camp"
                    className="w-full bg-white/80 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">💰 Budget (₹)</label>
                  <input
                    name="budget"
                    type="text"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g., 50000"
                    className="w-full bg-white/80 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Trip Days</label>
                  <input
                    name="tripDays"
                    type="text"
                    value={form.tripDays}
                    onChange={handleChange}
                    placeholder="e.g., 7"
                    className="w-full bg-white/80 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Starting Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Delhi"
                    className="w-full bg-white/80 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={fetchTripData}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg  cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Planning Your Adventure...</span>
                    </div>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Plan My Trip</span>
                    </>
                  )}

                </button>
              </div>
            </div>
          )}

        
          {/* Error Display */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Response Display */}
          {responseText && (
            <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-semibold text-white">Your Trip Plan</h3>
                  </div>
                  {/* Create New Plan Button */}
                  <button
                    onClick={handleCreateNewPlan}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30  px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm text-black cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Plan</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">{responseText}</div>
                </div>
              </div>
            </div>
          )}
        </div>


      </div>
      <Footer />
    </>
  )
}
