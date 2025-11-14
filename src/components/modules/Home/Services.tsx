import { serviceData } from "@/constants/services/serviceData";

const Services = async () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-16">
      <h2 className="text-4xl font-bold text-center">Services</h2>
      <article className="text-center text-gray-300 max-w-2xl mx-auto mt-3">
        I provide a wide range of modern, high-quality web solutions designed to
        help businesses grow, improve efficiency, and build a powerful digital
        presence.
      </article>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="
                group p-8 border border-white/10 rounded-2xl transition 
                bg-white/5 backdrop-blur-sm shadow-md
                hover:bg-linear-to-br hover:from-red-600 hover:to-black
                hover:shadow-xl hover:-translate-y-1
                cursor-pointer
              "
            >
              <div className="flex justify-center">
                <Icon
                  size={60}
                  className="text-red-400 group-hover:text-white transition"
                />
              </div>
              <h3
                className="
                  text-xl font-bold text-center mt-4 tracking-wider 
                  group-hover:text-white transition
                "
              >
                {item.title}
              </h3>
              <div className="h-0.5 w-14 bg-red-500 mx-auto mt-4 group-hover:bg-white transition"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
