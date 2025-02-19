"use client";

import { useEffect, useState } from "react";

import { Footer, VisualizationCard } from "components/custom";
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
    threshold: 0.6,
    triggerOnce: true,
  });
  const [map, mapInView] = useInView({
    threshold: 0.6,
    delay: 50,
  });
  const [trends, trendsInView] = useInView({
    threshold: 0.6,
    delay: 50,
  });
  const [demo, demoInView] = useInView({
    threshold: 0.6,
    delay: 50,
  });
  const [connections, connectionsInView] = useInView({
    threshold: 0.6,
    delay: 50,
    rootMargin: "-200px 0px 0px 0px",
  });

  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ArtVis",
    description:
      "Explore art history through interactive visualizations and data-driven insights",
    applicationCategory: "Visualization Application",
    audience: {
      "@type": "Audience",
      audienceType: ["Museum Curators", "Art Historians", "Art Enthusiasts"],
    },
    educationalUse: ["Data Visualization", "Research", "Analysis"],
    keywords:
      "art history, museum exhibitions, artist demographics, data visualization",
    isAccessibleForFree: true,
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="bg-coffee fixed left-0 right-0 top-0 z-50 h-1"
        style={{ scaleX }}
      />

      <div className="text-espresso font-serif">
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-latte flex h-screen max-h-screen min-h-screen flex-col items-center justify-center"
        >
          <h1 className="text-coffee mb-4 text-center text-7xl font-bold md:text-9xl">
            ArtVis
          </h1>
          <p className="text-espresso text-center text-3xl md:text-4xl">
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
          description="Journey through the art capitals of the world, from continents to cities and see where masterpieces come alive. This view highlights histograms to explore exhibition trends across continents, countries and cities."
          link="/geographic-trends"
          image="https://images.metmuseum.org/CRDImages/ep/original/DP346474.jpg"
          imageAlt="View of Toledo by El Greco"
          imageLeft={true}
          cta="Chart Creativity"
        />
        <VisualizationCard
          ref={demo}
          title="The Artist's Mosaic: Demographics Revealed"
          description="Discover the lifelines, identities and origins of the artists who shaped history. This visualization presents artists' lifespan, gender and nationality distributions based on selected regions and exhibitions."
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
