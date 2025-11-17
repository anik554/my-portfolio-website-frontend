import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";

const DashboardHomePage = async() => {
  const sesseion = await getServerSession(authOptions)
  console.log(sesseion)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome,{sesseion?.user?.name}</h1>
      <p>{sesseion?.user?.email}</p>
    </div>
  );
};

export default DashboardHomePage;
