import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  return (
    <div className="relative w-full bg-black text-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #2b0707 100%)",
        }}
      />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-40 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* LEFT SIDE CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hello <br />
            I&apos;m <span className="text-red-500">Full Stack Developer</span> <br />
            Based Worldwide
          </h2>

          <p className="text-lg text-gray-300 max-w-lg">
            I build modern web applications with cutting-edge technologies like
            React, Next.js, Node.js, PostgreSQL & more.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 font-semibold text-white transition"
            >
              Hire Me
            </Link>

            <Link
              href="/cv.pdf"
              target="_blank"
              className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white hover:text-black font-semibold transition"
            >
              Download CV
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/person2.jpg"
            alt="Developer"
            width={350}
            height={350}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </section>
    </div>
  );
}
