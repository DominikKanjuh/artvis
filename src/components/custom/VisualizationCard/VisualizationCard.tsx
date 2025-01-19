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
          className="bg-cream flex h-screen max-h-screen min-h-screen items-center"
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div
            className={`relative h-full w-full overflow-hidden md:aspect-[16/9] ${
              imageLeft ? "md:flex-row-reverse" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:ml-8 md:w-1/2 md:justify-center">
              <h2 className="text-cream mb-4 text-4xl font-bold">{title}</h2>
              <p className="text-cream mb-4 text-lg">{description}</p>
              <Link
                href={link}
                className="bg-coffee text-cream group inline-flex items-center rounded px-4 py-2 transition-colors hover:bg-opacity-90"
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
