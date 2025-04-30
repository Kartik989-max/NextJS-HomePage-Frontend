// "use client";

// interface AboutSectionProps {
//   title: string;
//   description: string;
//   imageUrl?: string;
// }

// export function AboutSection({ title, description, imageUrl }: AboutSectionProps) {
//   return (
//     <section className="py-20 px-6 bg-white dark:bg-gray-950">
//     <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
//       <img
//         src={imageUrl}
//         alt="About"
//         className="w-full rounded-lg shadow-md"
//       />
//       <div>
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
//           {title}
//         </h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300">{description}</p>
//       </div>
//     </div>
//   </section>
//   );
// }


import { motion } from "framer-motion"


interface AboutSectionProps {
  title?: string
  description?: string
  imageUrl?: string
}

const features = [
  {
    title: "Expert Development",
    description: "Our team of skilled developers creates robust and scalable solutions.",
    icon: "💻"
  },
  {
    title: "Modern Design",
    description: "Beautiful, responsive designs that work on all devices.",
    icon: "🎨"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock support to help you whenever you need it.",
    icon: "🚀"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock support to help you whenever you need it.",
    icon: "🚀"
  }
]
export function AboutSection(
  { title, description, imageUrl }: AboutSectionProps) {
  return (
    <section className="pt-24 bg-background">
      <div className="container text-center px-4 md:px-6">
      <h2 className="text-3xl pb-10 font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {title}
              </h2>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 ">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
             
              <p className="text-lg text-muted-foreground md:text-xl">
                {description}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-px bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-200" />
                  <div className="relative bg-card hover:bg-card/50 border rounded-lg p-6 space-y-2 transition duration-200">
                    <div className="text-2xl">{feature.icon}</div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 pointer-events-none" />
            <img
              src={imageUrl}
              alt="About Us"
            
              className="object-cover h-110 w-150 rounded-2xl shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
