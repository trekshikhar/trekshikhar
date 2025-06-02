import AboutSection from "./components/aboutsection";
import Blog from "./components/blog";
import CTA from "./components/CtaSection";
import TopDestinations from "./components/destination";
import Footer from "./components/footer";
import HeaderCarousel from "./components/herosection";
import Navbar from "./components/navbar";
import { TopTrek } from "./components/TopTreak";


export default function Home() {
  return (
    <main>
      <Navbar />
      <HeaderCarousel/>
      <AboutSection />
      <TopTrek />
      <TopDestinations />
      <Blog />
      <CTA />
      
      <Footer />
    </main>
  );
}
