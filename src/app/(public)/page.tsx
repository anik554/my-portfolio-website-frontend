/* eslint-disable @typescript-eslint/no-explicit-any */
// import BlogCard from "@/components/modules/Blogs/BlogCard";
import AboutMe from "@/components/modules/Home/AboutMe";
import Hero from "@/components/modules/Home/Hero";
import Resume from "@/components/modules/Home/Resume";
import Services from "@/components/modules/Home/Services";

export default async function HomePage() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
  //   next: {
  //     tags: ["BLOGS"],
  //   },
  // });
  // const { data: blogs } = await res.json();

  return (
    <div>
      <Hero />
      <AboutMe />
      <Resume />
      <Services />
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
        {/* {blogs.slice(0, 3).map((blog: any) => (
          <BlogCard key={blog?.id} post={blog} />
        ))} */}
      </div>
    </div>
  );
}