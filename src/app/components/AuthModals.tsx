"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { BASE_URL } from "./constants";

interface AuthModalContextType {
    setShowLoginModal: (value: boolean) => void;
    setShowRegisterModal: (value: boolean) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = () => {
    const context = useContext(AuthModalContext);
    if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
    return context;
};

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<{ name: string } | null>(null);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: "",
        general: "",
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
        const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;
        const termsChecked = (form.elements.namedItem("terms") as HTMLInputElement).checked;

        // Simple check if any required field is empty or unchecked
        if (!name || !email || !password || !confirmPassword || !termsChecked) {
            setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: "",
                general: "Please fill all fields and agree to the terms."
            });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: "",
                general: "Passwords do not match."
            });
            return;
        }

        // Clear previous errors before sending request
        setErrors({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: "",
            general: "",
        });

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok || data.message !== "User registered successfully") {
                setErrors({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    terms: "",
                    general: data.message || "Registration failed."
                });
                return;
            }

            // Success
            setShowRegisterModal(false);
            setShowLoginModal(true);
        } catch (error) {
            console.error("Registration error:", error);
            setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: "",
                general: "Something went wrong. Please try again."
            });
        }
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

        if (!email || !password) {
            setLoginError("Please fill in both email and password.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok || data.message === "Invalid email or password") {
                setLoginError(data.message || "Login failed.");
                return;
            }

            localStorage.setItem("token", data.token);


            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("isLoggedIn", "true");

            setLoginError("");
            setShowLoginModal(false);
            setLoggedInUser(data.user);
            setShowLoginSuccessModal(true);
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthModalContext.Provider value={{ setShowLoginModal, setShowRegisterModal }}>
            {children}

            {showLoginSuccessModal && loggedInUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-8 text-center transform transition-all duration-300 animate-slide-up">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Welcome back! 👋
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                            <strong className="font-semibold">Name:</strong> {loggedInUser.name}
                        </p>

                        <button
                            onClick={() => {
                                setShowLoginSuccessModal(false);
                                window.location.reload();
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}



            {/* === Login Modal === */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={() => setLoginError("")}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={() => setLoginError("")}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                                >
                                    Sign in
                                </button>
                                {loginError && (
                                    <p className="text-red-500 text-sm text-center mt-2">{loginError}</p>
                                )}
                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Don not have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setShowLoginModal(false);
                                            setShowRegisterModal(true);
                                        }}
                                        className="text-emerald-600 hover:underline"
                                    >
                                        Register
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === Register Modal === */}
            {showRegisterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-6 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
                                <button
                                    onClick={() => setShowRegisterModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form className="space-y-4" onSubmit={handleRegister}>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={() => setErrors(prev => ({ ...prev, name: "" }))}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                                
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={() => setErrors(prev => ({ ...prev, email: "" }))}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                                
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={() => setErrors(prev => ({ ...prev, password: "" }))}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                              
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={() => setErrors(prev => ({ ...prev, confirmPassword: "" }))}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                />
                               
                                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <input
                                        name="terms"
                                        type="checkbox"
                                        onChange={() => setErrors(prev => ({ ...prev, terms: "" }))}
                                        className="mr-2 h-4 w-4 text-emerald-600"
                                    />
                                    I agree to the{" "}
                                    <a href="#" className="text-emerald-600 ml-1">Terms</a> and
                                    <a href="#" className="text-emerald-600 ml-1"> Privacy</a>
                                </div>


                              
                              
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                                >
                                    Create account
                                </button>
                                {errors.general && (
                                    <p className="text-red-500 text-center text-sm mt-2">{errors.general}</p>
                                )}
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setShowRegisterModal(false);
                                            setShowLoginModal(true);
                                        }}
                                        className="text-emerald-600 hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthModalContext.Provider>
    );
};
