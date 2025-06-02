"use client"

import { useCallback, useEffect, useState } from "react"
import { useAuthModal } from "./AuthModals"
import { BASE_URL } from "./constants"

interface Comment {
    _id: string
    author: {
        id: string
        name: string
    }
    content: string
    createdAt: string
}

export function CommentSection({ postId }: { postId: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const { setShowLoginModal } = useAuthModal()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`${BASE_URL}/blog/${postId}/comments`)
            if (!res.ok) throw new Error("Failed to fetch comments")
            const data = await res.json()
            setComments(data)
        } catch (err) {
            console.error("Error loading comments:", err)
        }
    }, [postId])

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"))
        fetchComments()
    }, [fetchComments])


    const handleSubmitComment = async () => {
        if (!isLoggedIn) {
            setShowLoginModal(true)
            return
        }

        const userData = localStorage.getItem("user")
        if (!userData) {
            alert("User data not found. Please log in again.")
            return
        }

        try {
            setIsPosting(true)

            const user = JSON.parse(userData)
            const token = localStorage.getItem("token")

            const res = await fetch(`${BASE_URL}/blog/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: postId,
                    author: user.name,
                    content: newComment,
                }),
            })

            if (!res.ok) throw new Error("Failed to post comment")

            setNewComment("")
            fetchComments() // Refresh comments after posting
        } catch (error) {
            console.error("Error posting comment:", error)
            alert("Failed to post comment.")
        } finally {
            setIsPosting(false)
        }
    }

    return (
        <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937", marginBottom: 24 }}>
                Comments ({comments.length})
            </h2>

            <div style={{ marginBottom: 32 }}>
                <textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: 120,
                        padding: 12,
                        borderRadius: 8,
                        border: "1px solid #D1D5DB",
                        resize: "vertical",
                        fontSize: 16,
                        marginBottom: 16,
                    }}
                />
                <button
                    onClick={handleSubmitComment}
                    disabled={isPosting}
                    style={{
                        backgroundColor: isPosting ? "#6EE7B7" : "#10B981",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: 8,
                        border: "none",
                        cursor: isPosting ? "not-allowed" : "pointer",
                        fontWeight: "bold",
                    }}
                >
                    {isPosting ? "Posting..." : "Post Comment"}
                </button>
            </div>

            <div>
                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: 24, marginBottom: 24 }}
                    >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "#6B7280",
                                    color: "white",
                                    fontWeight: "bold",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexShrink: 0,
                                    fontSize: 16,
                                    userSelect: "none",
                                }}
                            >
                                {comment.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <h3 style={{ fontWeight: "600", color: "#111827", margin: 0 }}>
                                        {comment.author.name}
                                    </h3>
                                    <span style={{ fontSize: 14, color: "#6B7280" }}>
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p style={{ color: "#374151", margin: 0 }}>{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
