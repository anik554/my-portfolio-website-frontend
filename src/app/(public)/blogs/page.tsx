import BlogCard from "@/components/modules/Blogs/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata={
  title: "All Blogs",
  description:"This is a Blog Page from portfolio website"
}

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache:"no-store"
  });
  const { data: blogs } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
        {blogs?.map((blog: any) => (
          <BlogCard key={blog?.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
