import { MotionConfig } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { DriveCollection } from "@/components/sections/DriveCollection";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Location } from "@/components/sections/Location";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { StructuredData } from "@/components/StructuredData";

export default function App() {
  return (
    // reducedMotion="user" disables transform animations for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <StructuredData />
      <a
        href="#about"
        className="sr-only z-[100] rounded bg-gold px-4 py-2 font-medium text-maroon-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Services />
        <FeaturedWork />
        <Gallery />
        <DriveCollection />
        <WhyChooseUs />
        <Statistics />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
        <Location />
      </main>
      <Footer />
      <FloatingContact />
    </MotionConfig>
  );
}
