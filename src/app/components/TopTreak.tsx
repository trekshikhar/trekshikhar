"use client";

import { useEffect, useState } from "react";
import {  MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import { BASE_URL } from "./constants";

interface Trek {
    _id: string;
    name: string;
    location: string;
    shortDescription: string;
    image: string;
    duration: string;
    bestTimeToVisit: string;
    rating: number;
}

export const TopTrek = () => {
    const [treks, setTreks] = useState<Trek[]>([]);

    useEffect(() => {
        const fetchTreks = async () => {
            try {
                const res = await fetch(`${BASE_URL}/trek`);
                const data = await res.json();

               
                const trekList = data;

               
                const lastIndex = parseInt(localStorage.getItem("trekRotateIndex") || "0");
                const rotated = rotateTreks(trekList, lastIndex);
                setTreks(rotated);

                // Update rotation index in localStorage
                const nextIndex = (lastIndex + 1) % trekList.length;
                localStorage.setItem("trekRotateIndex", nextIndex.toString());
            } catch (err) {
                console.error("Failed to fetch treks", err);
            }
        };

        fetchTreks();
    }, []);

    const rotateTreks = (list: Trek[], index: number): Trek[] => {
        return [...list.slice(index), ...list.slice(0, index)];
    };

    return (
        <section className="py-16 md:py-24 px-12">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">India  Top Treks</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover the most iconic and breathtaking trekking destinations across India, from the snow-capped
                        Himalayas to the lush Western Ghats.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treks.map((trek) => (
                        <Card key={trek._id} className="trek-card overflow-hidden">
                            <div className="relative h-58">
                                <Image
                                    src={trek.image || "/placeholder.svg"}
                                    alt={trek.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle>{trek.name}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {trek.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{trek.shortDescription}</p>
                                {/* <div className="flex items-center justify-between mt-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{trek.bestTimeToVisit}</span>
                                    </div>
                                   
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-primary" />
                                        <span>{trek.duration}</span>
                                    </div>
                                </div> */}
                            </CardContent>
                            <CardFooter>
                                <Link
                                    href={`/singletrek/${trek._id}`}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer "
                                >
                                    Explore Trek
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button 
                        onClick={() => window.location.href = "/trek"}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer">

                        View All Treks
                    </button>
                </div>
            </div>
        </section>
    );
};
