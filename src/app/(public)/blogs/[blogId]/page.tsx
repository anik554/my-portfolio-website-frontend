import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

// Force runtime rendering (no build-time fetch)
export const dynamic = "force-dynamic";

// ------------------
// Metadata
// ------------------
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.blogId}`,
    { cache: "no-store" } // runtime fetch
  );

  const { data: blog } = await res.json();

  return {
    title: blog?.title,
    description: blog?.content,
  };
}

// ------------------
// Page Component
// ------------------
const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.blogId}`,
    { cache: "no-store" }
  );

  const { data: blog } = await res.json();

  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
