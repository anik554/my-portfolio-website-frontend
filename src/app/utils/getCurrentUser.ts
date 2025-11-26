"use server"

import { decodeToken } from "@/lib/auth";
import { cookies } from "next/headers";


export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");

    if (!token?.value) return null;

    const user = decodeToken(token.value);
    return user;
  } catch (err) {
    console.error("Failed to get current user:", err);
    return null;
  }
}
