/* eslint-disable @typescript-eslint/no-explicit-any */
// import BlogCard from "@/components/modules/Blogs/BlogCard";
import AboutMe from "@/components/modules/Home/AboutMe";
import ContactMe from "@/components/modules/Home/ContactMe";
import Hero from "@/components/modules/Home/Hero";
import Resume from "@/components/modules/Home/Resume";
import Services from "@/components/modules/Home/Services";
import Skills from "@/components/modules/Home/Skills";

export default async function HomePage() {

  return (
    <div>
      <Hero />
      <AboutMe />
      <Resume />
      <Services />
      <Skills />
      <ContactMe />
    </div>
  );
}