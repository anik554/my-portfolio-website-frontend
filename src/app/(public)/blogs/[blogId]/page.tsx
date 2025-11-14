import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  console.log(await params);
  const {blogId} = await params;
  const res = fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`)
  const blog = await (await res).json()
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h1>BlogDetailsPage</h1>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
