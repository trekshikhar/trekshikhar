"use client";

import Image from "next/image";
import { LikeDislikeButtons } from "@/app/components/like-dislike-button";
import { CommentSection } from "@/app/components/CommentSection";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { BASE_URL } from "@/app/components/constants";

type BlogPostType = {
    id: string;
    title: string;
    image: string;
    content: string;
    date: string;
    likes: number;
    dislikes: number;
};

export default function BlogPost() {
  const { id } = useParams();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BASE_URL}/blog/${id}`);
                if (!response.ok) throw new Error("Failed to fetch blog post");
                const data = await response.json();
                setPost({
                    id: data._id,
                    title: data.title,
                    image: data.image,
                    content: data.description.replace(/\r\n/g, "<br />"),
                    date: new Date(data.createdAt).toLocaleDateString(),
                    likes: data.likes,
                    dislikes: data.dislikes,
                  
                });
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <div className="text-center py-12 text-gray-600">Loading...</div>;
    }

    if (error || !post) {
        return <div className="text-center py-12 text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <main className="container px-4 py-8 bg-gray-50">
              

                <article className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">{post.title}</h1>

                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8">
                        <span>{post.date}</span>
                        {/* <span className="mx-2">•</span>
                        <span>By {post.author}</span> */}
                    </div>

                    <div className="relative w-full h-[400px]  mb-8  rounded-lg overflow-hidden">
                        <Image
                            src={post.image }
                            alt={post.title}
                            width={900}
                            height={600}
                            priority
                        />
                    </div>

                    <div
                        className="prose prose-emerald dark:prose-invert max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="border-b py-4 pt-2 my-8 mt-2">
                        <LikeDislikeButtons likes={post.likes} dislikes={post.dislikes} id={post.id} />
                    </div>

                    <CommentSection postId={String(id)} />
                </article>
            </main>
            <Footer />
        </>
    );
}
