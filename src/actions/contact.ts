"use server";
import { FieldValues } from "react-hook-form";

export const contact = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("Message Send Faild", await res.text());
  }
  return await res.json();
};
