"use client";

import Link from "next/link"
import { Mountain, Mail, Instagram, Facebook, MapPin, Phone } from "lucide-react"


export default function Footer() {

  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {/* <div className="py-10 border-b border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Join Our Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get the latest updates on new treks, travel tips, and exclusive offers.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:focus:ring-emerald-400 dark:focus:border-emerald-400 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                <Mountain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Trekshikhar
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your ultimate guide to exploring the breathtaking mountains and trails across India.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1KksYhoK5x/"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a> */}
              <a
                href="https://www.instagram.com/trekshikhar_1?igsh=b3h2cmw3OGZld2U0"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              {/* <a
                href="#"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Budget Planner
                </Link>
              </li>
              <li>

                <button
                 onClick={() => { window.location.href = "/createTrek"; }}
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Create Trek
                </button>

              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/trek"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                 Kedarkantha Trek
                </Link>
              </li>
              <li>
                <Link
                  href="/trek"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Goechala Trek
                </Link>
              </li>
              <li>
                <Link
                  href="/trek"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Chadar Trek
                </Link>
              </li>
              <li>
                <Link
                  href="/trek"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                 Har Ki Dun Trek
                </Link>
              </li>
              <li>
                <Link
                  href="/trek"
                  className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                >
                  Valley of Flowers Trek
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Mountain View, Himalayan Heights, Uttarakhand, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">info@indiatrekking.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} India Trekking. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
