"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { useAuthModal } from "./AuthModals"
import { useRouter } from "next/navigation"
import { BASE_URL } from "./constants"


interface Post {
    likes: number
    dislikes: number
    id: string
    title: string
    description: string
    image: string
    date: string
}

export function BlogCard({ post }: { post: Post }) {
    const router = useRouter();

    const { setShowLoginModal } = useAuthModal();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);

    const handleLikeClick = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/blog/${post.id}/like`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {

                const data = await response.json();
                setLikes(data.likes);
                setDislikes(data.dislikes);
            }
        } catch (err) {
            console.error("Error liking post: ", err);
        }
    };

    const handleDislike = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/blog/${post.id}/dislike`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setDislikes(data.dislikes);
                setLikes(data.likes);
            }
        } catch (err) {
            console.error("Error disliking post:" , err);
        }
    };



    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="relative h-48 w-full" >
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />

                ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500">
                        No image available
                    </div>
                )}
            </div>

            {/* Header */}
            <CardHeader className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.date}</p>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-gray-600">{post.description}</p>
            </CardContent>

            {/* Footer (buttons always stick to bottom) */}
            <div className="p-4 mt-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <button
                        className="text-emerald-500 hover:text-gray-700 transition-colors flex items-center cursor-pointer"
                        onClick={handleLikeClick}
                    >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {likes}
                    </button>

                    <button
                        className="text-rose-500 hover:text-gray-700 transition-colors flex items-center cursor-pointer"
                        onClick={handleDislike}
                    >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {dislikes}
                    </button>
                </div>


                <button
                    onClick={() => router.push(`/singleBlog/${post.id}`)}
                    className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
                >
                    Read More
                </button>
            </div>
        </Card>
    );

}
