"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "./constants";

interface BlogPost {
    _id: string;
    title: string;
    shortDescription: string;
    image: string;
    createdAt: string;
    author?: { name?: string };
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const BlogSection: React.FC = () => {
    const router = useRouter();
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    const shuffleArray = (array: BlogPost[]) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
               
                const response = await axios.get(`${BASE_URL}/blog`, {
                    
                });
                const shuffled = shuffleArray(response.data);
                setBlogPosts(shuffled.slice(0, 6));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    const getDateParts = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        return { day, month };
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Our Blog</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-2">

                        Read experiences and advice from our community of trekkers to inspire your next adventure.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => {
                        const { day, month } = getDateParts(post.createdAt);
                        return (
                            <div key={post._id} className="bg-white shadow rounded overflow-hidden flex flex-col">
                                <div className="relative">
                                    <Image
                                        src={post.image || "/no-image.jpg"}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-60 object-cover"
                                        style={{ objectFit: "cover" }}
                                    />
                                    {/* Calendar-style Date Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className="relative w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold flex flex-col justify-center items-center rounded-lg shadow-md hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg">
                                            <span className="text-black text-base leading-none">{day}</span>
                                            <span className="uppercase text-xs">{month}</span>
                                            {/* Folded corner */}
                                            <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] border-t-lime-700 border-l-[16px] border-l-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">

                                    <h5 className="text-lg font-semibold mb-2">{post.title}</h5>
                                    <p className="text-gray-600 text-sm">{post.shortDescription}</p>
                                    <div className="mt-auto pt-4">
                                        <a
                                            onClick={() => router.replace(`/singleBlog/${post._id}`)}
                                            className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="/blog"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        View All Blogs
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
