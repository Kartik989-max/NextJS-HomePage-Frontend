// import Image from "next/image";

// export function FeaturedLogos({ logos }: { logos: string[] }) {
//   return (
//     <div className="flex gap-6 overflow-x-auto py-6 px-4">
//       {logos.map((logo, index) => (
//         <div key={index} className="min-w-[100px] h-[60px] flex items-center justify-center">
//           <Image
//             src={logo}
//             alt={`Logo ${index + 1}`}
//             width={100}
//             height={60}
//             className="object-contain grayscale hover:grayscale-0 transition"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

import { motion } from "framer-motion"
import Image from "next/image"

interface FeaturedLogosProps {
  title?: string;
  subtitle?: string;
  logos?: string[];
}

export function FeaturedLogos({
  title = "Trusted by Industry Leaders",
  subtitle = "Join the companies that have transformed their business with our solutions",
  logos = [
    "https://logo.clearbit.com/google.com",
    "https://logo.clearbit.com/meta.com",
    "https://logo.clearbit.com/microsoft.com",
    "https://logo.clearbit.com/amazon.com",
    "https://logo.clearbit.com/netflix.com",
    "https://logo.clearbit.com/apple.com"
  ]
}: FeaturedLogosProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-4"
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Logos Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Marquee Content */}
          <div className="flex animate-marquee whitespace-nowrap py-8">
            {/* First set of logos */}
            <div className="flex space-x-16 mx-8">
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="relative w-[100px] h-[100px] bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                >
                  <Image
                    src={logo}
                    alt={`Company logo ${index + 1}`}
                    fill
                    className="object-contain p-2 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-16 mx-8">
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="relative w-[100px] h-[100px] bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                >
                  <Image
                    src={logo}
                    alt={`Company logo ${index + 1}`}
                    fill
                    className="object-contain p-2 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
        >
          {[
            { value: "500+", label: "Global Clients" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Support" },
            { value: "100+", label: "Countries Served" }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-3xl font-bold tracking-tighter">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
