export const getAllBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-store",
  });
  const { data: blogs } = await res.json();
  return blogs
};
