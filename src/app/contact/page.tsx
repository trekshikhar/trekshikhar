"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp } from "lucide-react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { BASE_URL } from "../components/constants"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 2-4 weeks in advance, especially for popular treks during peak season. This ensures availability and gives us time to prepare all necessary arrangements for your trek.",
  },
  {
    question: "Do you provide equipment?",
    answer:
      "Yes, we provide all necessary trekking equipment including tents, sleeping bags, safety gear, and cooking equipment. However, personal items like clothing, boots, and backpacks need to be arranged by you.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Free cancellation up to 7 days before the trek. 50% refund for cancellations 3-7 days prior. No refund for cancellations within 3 days of the trek start date.",
  },
  {
    question: "What fitness level is required?",
    answer:
      "Fitness requirements vary by trek difficulty. Most of our treks require moderate fitness with ability to walk 6-8 hours daily. We provide detailed fitness guidelines for each trek during booking.",
  },
  {
    question: "Are meals included in the trek package?",
    answer:
      "Yes, all meals are included from dinner on day 1 to lunch on the last day. We provide nutritious, hygienic meals suitable for trekking. Special dietary requirements can be accommodated with advance notice.",
  },
  {
    question: "What happens in case of bad weather?",
    answer:
      "Safety is our priority. In case of severe weather conditions, we may modify the itinerary or postpone the trek. Full refund or rescheduling options are available for weather-related cancellations.",
  },
]

function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-3">
      {faqData.map((item, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{item.question}</h3>
            {openItems.includes(index) ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            )}
          </button>
          {openItems.includes(index) && (
            <div className="px-6 py-4 bg-white dark:bg-gray-900">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);


  type FormField = "firstName" | "lastName" | "email" | "phone" | "subject" | "message";
  interface FormDataType {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  

  const validate = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: { target: { id: string; value: string } }) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
   
    e.preventDefault();

    
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // store token if needed
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Error sending message." + (error ? " " + error : ""));
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Contact Us</h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Get in touch with our trekking experts
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(["firstName", "lastName"] as FormField[]).map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      id={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors[field]
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                      placeholder={field === "firstName" ? "John" : "Doe"}
                    />
                    {errors[field] && (
                      <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {(["email", "phone", "subject", "message"] as FormField[]).map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {field === "email"
                        ? "Email"
                        : field === "phone"
                          ? "Phone Number"
                          : field === "subject"
                            ? "Subject"
                            : "Message"}
                    </label>
                    {field === "subject" ? (
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                      >
                        <option value="">Select a subject</option>
                        <option value="trek-inquiry">Trek Inquiry</option>
                        <option value="booking">Booking Assistance</option>
                        <option value="general">General Question</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    ) : field === "message" ? (
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.message
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none`}
                        placeholder="Tell us about your trekking plans or ask any questions..."
                      ></textarea>
                    ) : (
                      <input
                        type={field === "email" ? "email" : "tel"}
                        id={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors[field]
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors`}
                        placeholder={
                          field === "email" ? "john@example.com" : "+91 98765 43210"
                        }
                      />
                    )}
                    {errors[field] && (
                      <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
              >
                {loading ? (
                  <>
                    <Send className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
            {success && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 text-center p-6 rounded-xl shadow-xl max-w-sm w-full">
                  <h2 className="text-lg font-semibold text-emerald-600 mb-4">
                    Message sent successfully!
                  </h2>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Mountain View
                      <br />
                      Himalayan Heights
                      <br />
                      Uttarakhand, India 248001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                    <p className="text-gray-600 dark:text-gray-400">+91 87654 32109</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@indiatrekking.com</p>
                    <p className="text-gray-600 dark:text-gray-400">support@indiatrekking.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Map Section */}
        <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Find Us</h2>
            <div className="w-full overflow-hidden rounded-lg aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15445478.34843344!2d54.41274274999996!3d19.06950800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9397b25be19%3A0x6a192cd643eb0b0a!2sGoogle%20Mumbai!5e0!3m2!1sen!2sin!4v1748185844577!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Enhanced FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>
      </main>
      <Footer />
    </div>
  )
}
