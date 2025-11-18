"use client";

import { TestimonialsColumn } from "./testimonials-columns-1";
import { motion } from "motion/react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="bg-black my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-gray-700 py-1 px-4 rounded-lg text-white" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-white text-center" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75 text-gray-300" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={17} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={17} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

