"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constants";

type Trek = {
  _id: string;
  name: string;
  image: string;
  location: string;
};

export default function TopDestinations() {
  const [treks, setTreks] = useState<Trek[]>([]);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
       
        const res = await fetch(`${BASE_URL}/trek`, {
         
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          // Rotate the array on each load
          const shiftBy = Math.floor(Math.random() * data.length);
          const rotated = [...data.slice(shiftBy), ...data.slice(0, shiftBy)];
          setTreks(rotated.slice(0, 6)); // Only take 6 items
        }
      } catch (err) {
        console.error("Failed to fetch treks:", err);
      }
    };

    fetchTreks();
  }, []);

  return (
    <div className="w-full py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 pb-6">
          
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Explore Top Destination
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Discover the most breathtaking treks across India, from the majestic Himalayas to the serene Western Ghats.
            </p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {treks.map((trek) => (
            <div key={trek._id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="relative overflow-hidden rounded-lg group shadow-lg">
                <div className="relative w-full h-56 bg-gray-200">
                  <Image
                    src={trek.image || "/placeholder.svg"}
                    alt={trek.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform group-hover:scale-110 duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div
                 
                  className="absolute inset-0 flex flex-col items-center justify-center transition group"
                >
                  <h5 className="text-white text-xl md:text-2xl font-bold mb-1">
                    {trek.name}
                  </h5>
                  <span className="text-white text-base font-medium">
                    {trek.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
