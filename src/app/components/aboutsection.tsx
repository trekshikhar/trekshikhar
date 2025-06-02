'use client';

import Image from 'next/image';
import { FaDollarSign, FaAward, FaGlobe } from 'react-icons/fa';

export default function AboutSection() {
    return (
        <section className="bg-gray-100 py-16 md:px-12 ">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
                {/* Left Image */}
                <div className="w-full lg:w-1/2">
                    <Image
                        src="/about.jpg"
                        alt="Traveler"
                        width={500}
                        height={600}
                        className="rounded"
                        style={{ width: "837px" }}
                    />
                </div>

                {/* Right Content */}
                <div className="w-full lg:w-1/2 bg-white p-8 shadow-md">
                    <h4 className="text-green-600 font-semibold mb-2 tracking-widest uppercase">About Us</h4>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug text-gray-800">
                        Discover Breathtaking Treks That Fit Your Budget
                    </h2>
                    <p className="text-gray-600 mb-6">
                        At Trekshikhar Treks, we specialize in curating unforgettable trekking experiences across India most scenic trails — from the Himalayan heights to the lush Western Ghats. Whether you are a seasoned hiker or a beginner, we offer packages that match your skill level and budget. Join us for guided adventures that blend nature, culture, and thrill.
                    </p>


                    {/* Images Row */}
                    <div className="flex gap-4 mb-6 flex-wrap">
                        <Image src="/about1.jpg" alt="" width={200} height={10} className="rounded" style={{ height: "150px" }} />
                        <Image src="/about2.jpg" alt="" width={200} height={10} className="rounded" style={{ height: "150px" }} />
                    </div>

                    <a
                        href="/contact"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        Book Now
                    </a>
                </div>
            </div>

            {/* Bottom Feature Boxes */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
                <div className="bg-white p-6 shadow-md flex items-start gap-4">
                    <div
                        className="px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-lg mb-1">Competitive Pricing</h5>
                        <p className="text-sm text-gray-600">We offer the best trekking experiences at budget-friendly rates — no hidden costs, just pure adventure.</p>
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md flex items-start gap-4">
                    <div
                        className="px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <FaAward size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-lg mb-1">Expert-Led Treks</h5>
                        <p className="text-sm text-gray-600">Our experienced local guides ensure safe, well-organized, and memorable trekking adventures.</p>
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md flex items-start gap-4">
                    <div
                        className="px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <FaGlobe size={24} />
                    </div>
                    <div>
                        <h5 className="font-bold text-lg mb-1">Pan-India Coverage</h5>
                        <p className="text-sm text-gray-600">From the Himalayas to the Sahyadris, we organize treks across India’s most iconic and hidden trails.</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
