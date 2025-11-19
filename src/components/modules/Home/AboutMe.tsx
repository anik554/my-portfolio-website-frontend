import Image from "next/image";
import { Mail, Phone, MapPin, Calendar, User, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutMe = async () => {
  return (
    <div className="py-16">
      <section className="relative z-10 max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        {/* LEFT IMAGE */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <Image
              src="/Anik_Image2.png"
              alt="Developer"
              width={380}
              height={380}
              className="rounded-2xl shadow-xl object-cover"
              priority
            />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-red-700/20 blur-xl -z-10"></div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">About Me</h2>

          <p className=" leading-relaxed">
            Hi, I’m <span className="font-semibold ">Anik Imtiaz</span> —  
            a passionate Full Stack Developer who loves crafting beautiful, fast, 
            and scalable web applications. I blend creativity with engineering to 
            bring ideas to life using modern technologies like <span className="text-red-400">React, Next.js, 
            Node.js, and PostgreSQL.</span>
          </p>

          {/* INFO GRID */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <InfoItem icon={<User size={20} />} label="Name" value="Md. Anik Imtiaz" />
            <InfoItem icon={<Calendar size={20} />} label="Date of Birth" value="November 02, 1993" />
            <InfoItem icon={<MapPin size={20} />} label="Address" value="Chad Uddan, Mohammadpur, Dhaka" />
            <InfoItem icon={<Hash size={20} />} label="Zip Code" value="1207" />
            <InfoItem icon={<Mail size={20} />} label="Email" value="anikimtiaz1993@gmail.com" />
            <InfoItem icon={<Phone size={20} />} label="Phone" value="+880 1734699652" />

          </div>
          <div>
            <h2 className="text-xl font-bold py-2">120 Project complete</h2>
          </div>
          <div>
            <Button>Download CV</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon, label, value }:{icon:any,label:string,value:string}) => (
  <div className="flex items-start gap-3 p-4 rounded-xl border">
    <div className="text-red-400">{icon}</div>
    <div>
      <p className="text-sm ">{label}</p>
      <p className="font-semibold ">{value}</p>
    </div>
  </div>
);

export default AboutMe;
