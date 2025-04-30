// "use client";
// import { HeroSection } from "@/components/HeroSection";
// import { AboutSection } from "@/components/AboutSection";
// import { FeaturedLogos } from "@/components/FeaturedLogos";
// import { FooterCTA } from "@/components/FooterCTA";
// import { useEffect, useState } from "react";

// interface Section {
//   _id: string;
//   type: string;
//   content: string;
// }

// export default function HomePage() {
//   const [sections, setSections] = useState<Section[]>([]);

//   const [Hero, setHero] = useState<Section | null>(null);
//   const [About, setAbout] = useState<Section | null>(null);
//   const [Featured, setFeatured] = useState<Section | null>(null);
//   const [Footer, setFooter] = useState<Section | null>(null);

//   const [loading, setLoading] = useState(false);

//   console.log("Sections:", sections);
  
//   useEffect(() => {
//     async function fetchSections() {
//       try {
//         const res = await fetch("http://localhost:5000/api/sections");
//         const data = await res.json();
//         setSections(data);
//       } catch (err) {
//         console.error("Failed to fetch sections", err);
//       }
//     }

//     fetchSections();
//   }, []);

 
//   useEffect(() => {
//     if (sections.length > 0) {
//       const hero = sections.find((section) => section.type === "heroo");
//       const about = sections.find((section) => section.type === "about");

//       const logos = sections.find((section) => section.type === "logos");
//       const footer = sections.find((section) => section.type === "footer");

//       setHero(hero || null);
//       setAbout(about || null);
//       setFeatured(logos || null);
//       setFooter(footer || null);
//       console.log("Hero:", hero);
//       console.log(Hero);
      
//     }
//   }, [sections]);
//   if (!HeroSection || !AboutSection || !FeaturedLogos || !FooterCTA) {
//     return <div>Loading...</div>;
//   }

 


//   return (
//     <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-500">
//       <main>
//         <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Life Coach</h1>

//         </div>
//         <HeroSection
//           title={Hero?.content || ""}
//           subtitle="Life coaching will guide you through a transformative journey of self-discovery, helping you unlock your true potential."
//           ctaButtons={[
//             { label: "Get Started", link: "#get-started" },
//             { label: "Learn More", link: "#learn-more" },
//           ]}
//         />
//         <AboutSection
//           title={About?.content || ""}
//           description="We are passionate about helping individuals find their purpose, overcome challenges, and achieve their dreams through personalized coaching sessions and actionable strategies."
//           imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//         />
//         <FeaturedLogos
//           logos={[
//             "https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_2015_logo.svg",
//             "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
//             "https://upload.wikimedia.org/wikipedia/commons/0/08/Microsoft_logo_%282012%29.svg",
//             "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
//             "https://upload.wikimedia.org/wikipedia/commons/9/96/Twitter_bird_logo_2012.svg",
//           ]}
//         />
//         <FooterCTA
//           title={Footer?.content || ""}
//           description="Join our community and start your journey today with personalized coaching sessions!"
//           buttonText="Get Started"
//           buttonLink="#get-started"
//         />
//       </main>
//     </div>
//   );


// }

"use client";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedLogos } from "@/components/FeaturedLogos";
import { FooterCTA } from "@/components/FooterCTA";
import { useEffect, useState } from "react";

interface Section {
  _id: string;
  type: string;
  title: string;
  content: string;
  order: number;
}

export default function HomePage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSections() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`);
        const data: Section[] = await res.json();

        // Sort based on `order`
        const sorted = data.sort((a, b) => a.order - b.order);
        setSections(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch sections", err);
        setLoading(false);
      }
    }

    fetchSections();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-500">
      <main>
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Life Coach</h1>
        </div>

        {sections.map((section) => {
          switch (section.type) {
            case "hero":
              return (
                <HeroSection
                  key={section._id}
                  title={section.title}
                  subtitle={section.content}
                  ctaButtons={[
                    { label: "Get Started", link: "#get-started" },
                    { label: "Learn More", link: "#learn-more" },
                  ]}
                />
              );
            case "about":
              return (
                <AboutSection
                  key={section._id}
                  title={section.title}
                  description={section.content}
                  imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                />
              );
            case "feature":
              return (
                <FeaturedLogos
                  key={section._id}
                  logos={[
                    "https://logo.clearbit.com/google.com",
                    "https://logo.clearbit.com/meta.com",
                    "https://logo.clearbit.com/microsoft.com",
                    "https://logo.clearbit.com/amazon.com",
                    "https://logo.clearbit.com/netflix.com",
                  ]}
                />
              );
            case "footer":
              return (
                <FooterCTA
                  key={section._id}
                  title={section.title}
                  description={section.content}
                  buttonText="Get Started"
                  buttonLink="#get-started"
                />
              );
            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}
