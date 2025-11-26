/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerUserAction = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      console.error("Registration Failed:", result);
      return {
        success: false,
        message: result.message || "Registration failed",
        errors: result.errors || [],
      };
    }

    return result;
  } catch (error: any) {
    console.error("Network/Server error during registration:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const login = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!result?.success) {
      return { success: false, message: result.message || "Login failed" };
    }

    // Save tokens into cookies
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      path: "/",
    });

    if (result.data.refreshToken) {
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        path: "/",
      });
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");

  redirect("/login");
}
