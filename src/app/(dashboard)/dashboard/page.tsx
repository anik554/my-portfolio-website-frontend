/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodeToken } from "@/lib/auth";
import { cookies } from "next/headers";

const DashboardHomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  let user: any = null;

  if (token?.value) {
    user = decodeToken(token.value);
    console.log("Decoded User:", user);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome, {user?.name || "User"}
      </h1>

      <p className="text-lg text-gray-600">
        Email: {user?.email || "No email found"}
      </p>
    </div>
  );
};

export default DashboardHomePage;
