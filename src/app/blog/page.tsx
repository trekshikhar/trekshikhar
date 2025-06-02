"use client";
import { PlusCircle } from "lucide-react";
import { BlogCard } from "../components/blog-card";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useAuthModal } from "../components/AuthModals";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/constants";

export default function AllBlogs() {
    const { setShowLoginModal } = useAuthModal();
    const router = useRouter();
    interface Blog {
        _id: string;
        title: string;
        shortDescription: string;
        image: string;
        likes: number;
        dislikes: number;
        createdAt: string;
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blog`);
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleCreateClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            router.push("/create");
        }
    };

    return (
        <>
            <Navbar />

            <main className="container mx-auto px-4 py-8 bg-gray-50">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h1 className="text-3xl font-extrabold text-emerald-700 tracking-wide">
                            Discover Your Next Great Adventure
                        </h1>
                        <button
                            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                            onClick={handleCreateClick}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create blog Post
                        </button>
                    </div>

                    <p className="text-gray-600 max-w-xl">
                        Explore inspiring stories and unforgettable experiences shared by adventurers like you. Share your journey or get inspired for your next trip!
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading blogs...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((post) => (
                            <BlogCard
                                key={post._id}
                                post={{
                                    id: post._id,
                                    title: post.title,
                                    description: post.shortDescription,
                                    image: post.image,
                                    likes: post.likes,
                                    dislikes: post.dislikes,
                                    date: new Date(post.createdAt).toLocaleDateString(),
                                }}
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
