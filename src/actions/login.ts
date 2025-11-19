"use server";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("Login Faild", await res.text());
  }
  const result = await res.json();
   const cookieStore = await cookies();
  cookieStore.set("token", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return result;
};
