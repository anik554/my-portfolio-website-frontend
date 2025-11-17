export const getAllUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
    cache: "no-store",
  });
  const { data: users } = await res.json();
  return users
};