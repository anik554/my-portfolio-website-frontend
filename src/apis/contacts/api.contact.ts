export const getAllContact = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
    cache: "no-store",
  });
  const { data: contacts } = await res.json();
  return contacts;
};
