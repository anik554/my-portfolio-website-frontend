export const getAllprojects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    cache: "no-store",
  });
  const { data: projects } = await res.json();
  return projects
};