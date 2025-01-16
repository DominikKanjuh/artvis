import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

const VisualizationCard = motion.create(
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
      ref: React.Ref<HTMLElement>,
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
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover" }}
              fill
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
    },
  ),
);

export default VisualizationCard;
