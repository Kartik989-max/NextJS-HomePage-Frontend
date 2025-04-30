// "use client";

// interface FooterCTAProps {
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonLink: string;
// }
// export function FooterCTA({ title, description, buttonText, buttonLink }: FooterCTAProps) {
//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black text-white py-16 px-6 text-center">
//       <h2 className="text-3xl font-bold mb-4">{title}</h2>
//       <p className="mb-6 text-lg">{description}</p>
//       <a href={buttonLink} className="bg-white text-black px-6 py-3 rounded-lg font-semibold transition hover:bg-gray-100">
//         {buttonText}
//       </a>
//     </section>
//   );
// }

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { motion } from "framer-motion"
import Link from "next/link"

interface FooterCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;  
}

const socialLinks = [
  { name: 'Twitter', url: '#', icon: '𝕏' },
  { name: 'LinkedIn', url: '#', icon: '𝕃' },
  { name: 'Instagram', url: '#', icon: '📸' },
  { name: 'GitHub', url: '#', icon: '🐙' },
]

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Coaching', href: '#' },
      { name: 'Training', href: '#' },
      { name: 'Workshops', href: '#' },
      { name: 'Consulting', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'License', href: '#' },
    ],
  },
]

export function FooterCTA({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#"
}: FooterCTAProps) {
  return (
    <footer className="bg-background ">
      {/* CTA Section */}
      <div className="container px-4 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-primary/5 px-6 py-6"
        >
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:100px_100px] [mask-image:radial-gradient(white,transparent_70%)]" />
          
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
            <p className="mt-4 text-muted-foreground">{description}</p>
            
            <div>
              <Button asChild className="bg-white text-black mt-6" size="lg">
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px]"
              />
              <Button>Subscribe</Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
