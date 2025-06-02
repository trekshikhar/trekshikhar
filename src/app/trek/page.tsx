"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star } from "lucide-react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import { BASE_URL } from "../components/constants"

interface Review {
    id: string
    author: string
    rating: number
    comment: string
    date: string
}

interface Trek {
    id: string
    name: string
    location: string
    shortDescription: string
    longDescription: string
    image: string
    duration: string
    bestTimeToVisit: string
    reviews: Review[]
    rating: number
}

export default function TrekPage() {
    const [treks, setTreks] = useState<Trek[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTreks() {
            try {



                const res = await fetch(`${BASE_URL}/trek`, {

                })

                if (!res.ok) {
                    throw new Error(`Error fetching treks: ${res.statusText}`)
                }

                const data = await res.json()

                // Map API response to Trek interface
                interface ApiReview {
                    _id: string
                    author: string | { name: string }
                    rating: number
                    comment: string
                    createdAt: string
                }

                interface ApiTrek {
                    _id: string
                    name: string
                    location: string
                    shortDescription: string
                    longDescription: string
                    image?: string
                    duration: string
                    bestTimeToVisit: string
                    rating: number
                    reviews: ApiReview[]
                }

                const mappedTreks: Trek[] = (data as ApiTrek[]).map((item: ApiTrek) => ({
                    id: item._id,
                    name: item.name,
                    location: item.location,
                    shortDescription: item.shortDescription,
                    longDescription: item.longDescription,
                    image: item.image || "/placeholder.svg",
                    duration: item.duration,
                    bestTimeToVisit: item.bestTimeToVisit,
                    rating: item.rating,
                    reviews: item.reviews.map((rev: ApiReview) => ({
                        id: rev._id,
                        author: typeof rev.author === "string" ? rev.author : rev.author.name,
                        rating: rev.rating,
                        comment: rev.comment,
                        date: rev.createdAt,
                    })),
                }))

                setTreks(mappedTreks)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }

        fetchTreks()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p>Loading treks...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-600">
                <p>{error}</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Discover Amazing Treks</h1>
                        <p className="mt-3 max-w-md mx-auto text-xl text-gray-100 sm:text-2xl md:mt-5 md:max-w-3xl">
                            Explore breathtaking trekking adventures from around the world. Find your next adventure and create
                            unforgettable memories.
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-12 sm:px-8 ">
                    {treks.map((trek) => (
                        <Link key={trek.id} href={`/singletrek/${trek.id}`}>
                            <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={trek.image || "/placeholder.svg"}
                                        alt={trek.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold mb-1 text-gray-800 line-clamp-1">
                                        {trek.name}
                                    </h3>

                                    <div className="flex items-center text-gray-500 text-sm mb-2">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {trek.location}
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                                        {trek.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{trek.duration} days</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
                                            <span className="font-semibold text-gray-700">{trek.rating?.toFixed(1) ?? "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                {treks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No treks available yet.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}
