"use client"

import { useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "./ui/button"
import { useAuthModal } from "./AuthModals"
import { BASE_URL } from "./constants"


interface LikeDislikeButtonsProps {
    likes: number
    dislikes: number
     id: string | number
}

export function LikeDislikeButtons({ likes, dislikes ,id }: LikeDislikeButtonsProps) {


    const { setShowLoginModal } = useAuthModal();

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const [alllikes, setLikes] = useState(likes);
    const [alldislikes, setDislikes] = useState(dislikes);

    const handleLike = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/blog/${id}/like`, {
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
            console.error("Error liking post:" , err);
        }
    };

    const handleDislike = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/blog/${id}/dislike`, {
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
        <div className="flex items-center space-x-6">
            <Button
                variant="ghost"
                size="default"
                onClick={handleLike}
                className={`flex items-center space-x-2 "text-emerald-600"`}
            >
                <ThumbsUp className="h-5 w-5" />
                <span>{alllikes}</span>
            </Button>
            <Button
                variant="ghost"
                size="default"
                onClick={handleDislike}
                className={`flex items-center space-x-2 "text-rose-600" `}
            >
                <ThumbsDown className="h-5 w-5" />
                <span>{alldislikes}</span>
            </Button>
        </div>
    )
}
