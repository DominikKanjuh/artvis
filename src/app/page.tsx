"use client";

import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LandingPage() {
  // smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [heroRef, _heroInView] = useInView({
    threshold: 0.65,
    triggerOnce: true,
  });
  const [map, mapInView] = useInView({
    threshold: 0.65,
    delay: 50,
  });
  const [trends, trendsInView] = useInView({
    threshold: 0.65,
    delay: 50,
  });
  const [demo, demoInView] = useInView({
    threshold: 0.65,
    delay: 50,
  });
  const [connections, connectionsInView] = useInView({
    threshold: 0.65,
    delay: 50,
  });

  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollToSection = (index: number) => {
    const targetPosition = window.innerHeight * index;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsManualScrolling(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const newTimeout = setTimeout(() => {
        setIsManualScrolling(false);
      }, 100);

      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: WHAAT
  useEffect(() => {
    if (isManualScrolling) return;

    if (mapInView) scrollToSection(1);
    if (trendsInView) scrollToSection(2);
    if (demoInView) scrollToSection(3);
    if (connectionsInView) scrollToSection(4);
  }, [
    mapInView,
    trendsInView,
    demoInView,
    connectionsInView,
    isManualScrolling,
  ]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-coffee z-50"
        style={{ scaleX }}
      />

      <div className="text-espresso font-serif">
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-screen min-h-screen max-h-screen flex flex-col items-center justify-center bg-latte"
        >
          <h1 className="text-7xl md:text-9xl font-bold text-center mb-4 text-coffee">
            ArtViz
          </h1>
          <p className="text-3xl md:text-4xl text-center text-espresso">
            Insight into Art
          </p>
        </motion.section>

        <VisualizationCard
          ref={map}
          title="Art Unveiled: Global Exhibitions Map"
          description="Explore the world's most celebrated exhibitions and uncover their hidden artistic gems."
          link="/global-exhibitions"
          image="https://images.metmuseum.org/CRDImages/ep/original/DT1567.jpg"
          imageAlt="The Harbor of Dieppe by Claude Monet"
          imageLeft={false}
          cta="Map the Art World"
        />
        <VisualizationCard
          ref={trends}
          title="Chronicles of Creativity: Geographic Trends"
          description="Journey through the art capitals of the world, from continents to cities, and see where masterpieces come alive. This view highlights histograms to explore exhibition trends across continents, countries, and cities."
          link="/geographic-trends"
          image="https://images.metmuseum.org/CRDImages/ep/original/DP346474.jpg"
          imageAlt="View of Toledo by El Greco"
          imageLeft={true}
          cta="Chart Creativity"
        />
        <VisualizationCard
          ref={demo}
          title="The Artist's Mosaic: Demographics Revealed"
          description="Discover the lifelines, identities, and origins of the artists who shaped history. This visualization presents artists' lifespan, gender, and nationality distributions based on selected regions and exhibitions."
          link="/artist-demographics"
          image="https://images.metmuseum.org/CRDImages/ep/original/DP-1410-001.jpg"
          imageAlt="Self Portrait with a Straw Hat by Vincent van Gogh"
          imageLeft={false}
          cta="Unveil Artist Profiles"
        />
        <VisualizationCard
          ref={connections}
          title="Threads of Genius: Artist-Exhibition Connections"
          description="Trace the intricate web of artists and their legendary exhibitions through time. This view explores relationships between artists and exhibitions using a network graph."
          link="/artist-connections"
          image="https://images.metmuseum.org/CRDImages/ep/original/DT1947.jpg"
          imageAlt="Dance at the Moulin de la Galette by Pierre-Auguste Renoir"
          imageLeft={true}
          cta="Connect the Dots"
        />

        <Footer />
      </div>
    </>
  );
}

const VisualizationCard = motion(
  forwardRef(
    (
      {
        title,
        description,
        link,
        image,
        imageAlt,
        imageLeft,
        cta,
      }: {
        title: string;
        description: string;
        link: string;
        image: string;
        imageAlt: string;
        imageLeft: boolean;
        cta: string;
      },
      ref: React.Ref<HTMLElement>
    ) => {
      return (
        <motion.section
          ref={ref}
          className="h-screen max-h-screen min-h-screen flex items-center bg-cream"
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div
            className={`relative w-full h-full md:aspect-[16/9] overflow-hidden ${
              imageLeft ? "md:flex-row-reverse" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end md:justify-center p-8 md:w-1/2 md:ml-8">
              <h2 className="text-4xl font-bold mb-4 text-cream">{title}</h2>
              <p className="mb-4 text-lg text-cream">{description}</p>
              <Link
                href={link}
                className="group inline-flex items-center bg-coffee text-cream py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
              >
                {cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.section>
      );
    }
  )
);

const Footer = () => {
  return (
    <footer className="bg-coffee text-cream py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-center md:text-left">
              ArtViz
            </h2>
            <p className="text-sm text-center md:text-left">Insight into Art</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm mb-2 text-balance">
              Made for the Information Visualization course (WS24/25) at TU Wien
            </p>
            <p className="text-xs mt-1 text-balance">
              by Dominik Kanjuh, Paul Nitzke and Georgios Papadopoulos
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-cream/20 text-center">
          <p className="text-xs">
            &copy; 2024 ArtViz. All rights reserved by the authors.
          </p>
        </div>
      </div>
    </footer>
  );
};
