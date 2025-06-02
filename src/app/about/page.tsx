import Image from "next/image"

import { Leaf, Shield, Users, Mountain } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-screen ">
                {/* Hero Section */}

                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">About Us</h1>
                        <p className="mt-3 max-w-md mx-auto text-xl text-gray-100 sm:text-2xl md:mt-5 md:max-w-3xl">
                            More than just treks — we help you explore India soul through its mountains, forests, and timeless villages
                        </p>
                    </div>
                </div>
                <div className=" py-16 md:py-24 px-12 bg-gray-100">
                    <section className=" ">
                        <div className="container">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h1 className="text-4xl font-bold mb-6">About Trekshikhar Trekking Explorer</h1>
                                    <p className="text-lg text-muted-foreground mb-4">
                                      We&rsquo;re passionate about connecting adventure seekers with India  most breathtaking trekking destinations
                                        while promoting sustainable and responsible tourism.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Founded in 2025 by a group of avid trekkers, our platform has grown into a community of thousands of
                                        outdoor enthusiasts who share their experiences, tips, and stories.
                                        At Trekshikhar, we believe trekking is more than just a physical activity — It&rsquo;s  a journey of personal growth,
                                        deep connection with nature, and discovery of local cultures. Our mission is to empower trekkers with authentic
                                        information, expert-curated routes, and responsible travel guidance.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Whether you&rsquo;re planning your first hike or a seasoned mountaineer looking for your next challenge, we aim to
                                        be your trusted companion — from choosing gear and understanding terrain to booking guided expeditions and
                                        engaging with fellow trekkers.
                                    </p>
                                </div>
                                <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden">
                                    <Image
                                        src="/carouselimg2.jpg"
                                        alt="Team hiking in mountains"
                                        width={300}
                                        height={300}
                                        className="w-full  rounded-lg"
                                        style={{ height: "600px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Mission Section */}
                <section className="py-16 px-12">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We are committed to promoting eco-friendly trekking practices while helping adventurers discover the
                                natural beauty of India diverse landscapes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Leaf className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Eco-Friendly Trekking</h3>
                                    <p className="text-muted-foreground">
                                        Promoting sustainable practices that preserve natural environments for future generations.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Community Building</h3>
                                    <p className="text-muted-foreground">
                                        Creating a supportive network of trekkers who share knowledge and experiences.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Safety First</h3>
                                    <p className="text-muted-foreground">
                                        Providing accurate information and resources to ensure safe trekking experiences.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Mountain className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Adventure Accessibility</h3>
                                    <p className="text-muted-foreground">
                                        Making trekking more accessible through budget planning tools and resources.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>



                {/* Story Section */}
                <section className="py-16 bg-gray-100 px-12">
                    <div className="container">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        Our journey began with a simple love for the mountains and a desire to share that passion with others.
                                        From our first trek in the Himalayas, we realized the transformative power of nature and the joy of
                                        exploring new trails.
                                    </p>
                                    <p>
                                        Over the years, we have trekked through some of India most stunning landscapes, from the snow-capped peaks
                                        of Ladakh to the lush forests of Kerala. Each trek has deepened our commitment to responsible tourism and
                                        preserving these natural wonders.
                                    </p>
                                    <p>
                                        Today, Trekshikhar is more than just a platform — it a community of like-minded adventurers who believe in
                                        the magic of trekking. We invite you to join us on this incredible journey and discover the beauty of India,
                                        one step at a time.
                                    </p>
                                    <p>
                                        Whether you are a seasoned trekker or just starting out, we have something for everyone. From expert guides and
                                        curated routes to gear recommendations and travel tips, we are here to help you make the most of your trekking
                                        adventures.
                                    </p>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="relative h-[400px] rounded-lg overflow-hidden">
                                    <Image
                                        src="/aboutpage2.jpg"
                                        alt="Team hiking in mountains"
                                        width={300}
                                        height={300}
                                        className="w-full  rounded-lg"
                                        style={{ height: "600px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}
