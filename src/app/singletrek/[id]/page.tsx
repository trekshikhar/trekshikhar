"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Calendar, User, Edit2, Save, X, Star } from "lucide-react"
import { useParams } from "next/navigation"
import Footer from "@/app/components/footer"
import Navbar from "@/app/components/navbar"
import { useAuthModal } from "@/app/components/AuthModals"
import { BASE_URL } from "@/app/components/constants"

interface Author {
  id: string
  name: string
}

interface Review {
  _id: string
  author: Author
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

interface Trek {
  _id: string
  name: string
  location: string
  shortDescription: string
  longDescription: string
  image: string
  imagePublicId: string
  duration: string
  bestTimeToVisit: string
  rating: number
  reviews: Review[]
  createdAt: string
  updatedAt: string
}

// Simple Star Rating Component
function SimpleStarRating({
  rating,
  onRatingChange,
  readonly = false,
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          onClick={() => !readonly && onRatingChange?.(star)}
        />
      ))}
    </div>
  )
}

export default function TrekDetailPage() {
  const { id } = useParams()
  const [trek, setTrek] = useState<Trek | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingReview, setEditingReview] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    rating: 0,
    comment: "",
  })
  const { setShowLoginModal } = useAuthModal()
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"))
  }, [])

  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user from localStorage:", parsedUser);
        setLoggedInUserId(parsedUser?.id || parsedUser?._id || null);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);



  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

 const fetchTrek = useCallback(async () => {
  try {
    setLoading(true)
    const response = await fetch(`${BASE_URL}/trek/${id}`, {
    
    })

    if (!response.ok) {
      throw new Error("Trek not found")
    }

    const data = await response.json()
    setTrek(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to fetch trek")
  } finally {
    setLoading(false)
  }
}, [id])

useEffect(() => {
  fetchTrek()
}, [fetchTrek])


  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (reviewForm.rating === 0) {
      alert("Please select a rating")
      return
    }

    if (!reviewForm.comment.trim()) {
      alert("Please write a comment")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${BASE_URL}/trek/${id}/reviews`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      await fetchTrek()
      setReviewForm({ rating: 0, comment: "" })

    } catch (error) {
      console.error("Error adding review:", error)
      alert("Error adding review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditReview = (review: Review) => {
    setEditingReview(review._id)
    setEditForm({
      rating: review.rating,
      comment: review.comment,
    })
  }

  const handleUpdateReview = async (e: React.FormEvent, reviewId: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }
    if (editForm.rating === 0) {
      alert("Please select a rating")
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/trek/${id}/reviews/${reviewId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          rating: editForm.rating,
          comment: editForm.comment,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update review")
      }

      await fetchTrek()
      setEditingReview(null)

    } catch (error) {
      console.error("Error updating review:", error)
      alert("Error updating review. Please try again.")
    }
  }

  const cancelEdit = () => {
    setEditingReview(null)
    setEditForm({ rating: 0, comment: "" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !trek) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Trek Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The trek you're looking for doesn't exist."}</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors">
            Back to Treks
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Trek Image */}
          <div className="mb-10 rounded-xl overflow-hidden shadow-md">
            <Image
              src={trek.image || "/placeholder.svg?height=400&width=800"}
              alt={trek.name}
              width={1200}
              height={500}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Trek Header */}
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{trek.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{trek.location}</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <SimpleStarRating rating={trek.rating} readonly />
                  <span className="text-gray-600 text-sm">
                    {trek.rating.toFixed(1)} ({trek.reviews.length} reviews)
                  </span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{trek.shortDescription}</p>
              </div>

              {/* Trek Details */}
              <div className="mb-10 bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Trek Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="text-gray-800">{trek.duration} days</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Best Time to Visit</span>
                    </div>
                    <p className="text-gray-800">{trek.bestTimeToVisit}</p>
                  </div>
                </div>
              </div>

              {/* Long Description */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Trek</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{trek.longDescription}</p>
              </div>
            </div>

            {/* Sidebar - Reviews */}
            <div className="lg:col-span-1">
              {/* Review Form */}
              <div className="mb-10 bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <SimpleStarRating
                      rating={reviewForm.rating}
                      onRatingChange={(rating) => setReviewForm((prev) => ({ ...prev, rating }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || reviewForm.rating === 0}
                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer "
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl shadow p-6 max-h-[28rem] overflow-y-auto space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews</h3>
                {trek.reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 pb-4">
                    {editingReview === review._id ? (
                      <div className="space-y-3">
                        <SimpleStarRating
                          rating={editForm.rating}
                          onRatingChange={(rating) => setEditForm((prev) => ({ ...prev, rating }))}
                        />
                        <textarea
                          value={editForm.comment}
                          onChange={(e) => setEditForm((prev) => ({ ...prev, comment: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => handleUpdateReview(e, review._id)}
                            className="flex items-center px-3 py-1 bg-green-600 text-white text-sm hover:bg-green-700 rounded cursor-pointer"
                          >
                            <Save className="w-3 h-3 mr-1" /> Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center px-3 py-1 bg-gray-500 text-white text-sm hover:bg-gray-600 rounded  cursor-pointer"
                          >
                            <X className="w-3 h-3 mr-1" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.author.name}</p>
                              <SimpleStarRating rating={review.rating} readonly />
                            </div>
                          </div>
                          {loggedInUserId === review.author.id && (() => {
                            console.log("Logged in user ID matches review author ID:", loggedInUserId, review.author.id);
                            return (
                              <button
                                onClick={() => handleEditReview(review)}
                                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            );
                          })()}


                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
