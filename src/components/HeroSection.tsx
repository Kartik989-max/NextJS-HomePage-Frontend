// "use client";

// import { Button } from "@/components/ui/button";

// interface HeroSectionProps {
//   title: string;
//   subtitle: string;
//   ctaButtons: {
//     label: string;
//     link: string;
//   }[];
// }

// export function HeroSection({ title, subtitle, ctaButtons }: HeroSectionProps) {
//   return (
//     // <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-500">
//     //   <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
//     //   <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8">{subtitle}</p>
//     //   <div className="flex flex-wrap gap-4">
//     //     {ctaButtons.map((button, index) => (
//     //       <Button key={index} asChild>
//     //         <a href={button.link}>{button.label}</a>
//     //       </Button>
//     //     ))}
//     //   </div>
//     // </section>
//     <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
//   <div className="max-w-6xl mx-auto px-6 text-center">
//   <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
//         {title}
//       </h1>
//       <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
//         {subtitle}
//       </p>
//     <div className="flex justify-center gap-4 mb-8">
//       <a href="#get-started" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Get Started</a>
//       <a href="#learn-more" className="border border-white text-white px-6 py-3 rounded-lg font-semibold">Learn More</a>
//     </div>
//     <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
//       <span>100+ Expert Coaches</span>
//       <span>30K+ Lives Changed</span>
//       <span>10+ Years Experience</span>
//     </div>
//   </div>
// </section>

//   );
// }

import { Button } from "./ui/button"
import { motion } from "framer-motion"

interface HeroSectionProps {
    title: string;
    subtitle: string;
    ctaButtons: {
      label: string;
      link: string;
    }[];
  }
export function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col gap-20 items-center justify-center bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <div className="container flex items-center w-auto gap-20 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl text-gray-50 font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl dark:text-gray-400">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6"
          >
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </motion.div>

          {/* Optional: Add a background pattern or decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 bg-[size:100px_100px] [mask-image:radial-gradient(white,transparent_70%)]" />
          </div>
        </div>
        <div>
          <img src="https://avatar.iran.liara.run/public/35" className="w-100 h-100" alt="" />
        </div>
      </div>

     <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <span>100+ Expert Coaches</span>
      <span>30K+ Lives Changed</span>
       <span>10+ Years Experience</span>
     </div>
    </section>
  )
}