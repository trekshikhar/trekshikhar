"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mountain, User, Menu, X, LogOut } from "lucide-react"
import { useAuthModal } from "./AuthModals"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { setShowLoginModal, setShowRegisterModal } = useAuthModal();

    const router = useRouter();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu when a modal is opened
    // useEffect(() => {
    //     if (showLoginModal || showRegisterModal) {
    //         setIsMenuOpen(false)
    //     }
    // }, [showLoginModal, showRegisterModal])

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMenuOpen])

    // Prevent body scroll when modal is open
    // useEffect(() => {
    //     if (showLoginModal || showRegisterModal) {
    //         document.body.style.overflow = "hidden"
    //     } else {
    //         document.body.style.overflow = "auto"
    //     }

    //     return () => {
    //         document.body.style.overflow = "auto"
    //     }
    // }, [showLoginModal, showRegisterModal])


    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        window.location.reload(); // or update state/router
    };

    // 🛑 Don’t render until login state is known
    if (isLoggedIn === null) return null;

    const handleCreateClick = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
        } else {
            router.push("/planner");
        }
    };
    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-white dark:bg-gray-900"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                                <Mountain className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                Trekshikhar
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/trek"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                Trek
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/blog"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                Blog
                            </Link>
                            <button
                                onClick={handleCreateClick}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors  cursor-pointer"
                            >
                                 Planner
                            </button>
                            <Link
                                href="/contact"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                Contact
                            </Link>
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            {!isLoggedIn ? (
                                <>
                                    {/* User Icon */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowLoginModal(true)}
                                            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors  cursor-pointer"
                                            aria-label="User menu"
                                        >
                                            <User className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Get Started Button */}
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg  cursor-pointer"
                                    >
                                        Get Started
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors shadow-md hover:shadow-lg  cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center gap-4">


                            <button
                                className="menu-button p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors  cursor-pointer"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                        <div className="px-4 py-4 space-y-3">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home

                            </Link>
                            <Link
                                href="/trek"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trek
                            </Link>
                            <Link
                                href="/about"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/blog"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <button
                                onClick={handleCreateClick}
                                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                                Budget Planner
                            </button>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 space-y-3">
                                {!isLoggedIn ? (
                                    <>
                                        <button
                                            onClick={() => setShowLoginModal(true)}
                                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => setShowRegisterModal(true)}
                                            className="w-full px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors cursor-pointer"
                                        >
                                            Register
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-3 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>


        </>
    )
}
