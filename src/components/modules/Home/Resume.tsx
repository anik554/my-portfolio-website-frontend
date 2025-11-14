import { resumeData } from "@/constants/resume/resumeData";

const Resume = async () => {
  return (
    <div className="max-w-7xl mx-auto px-5 items-center">
      <h2 className="text-4xl font-bold text-center">Resume</h2>
      <article className="text-center ">
        A small river named Duden flows by their place and supplies it with the
        necessary regelialia. It is a paradisematic country, in which roasted
        parts of sentences fly into your mouth.
      </article>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {resumeData.map((item) => (
          <div
            key={item.id}
            className="p-6 border rounded-2xl space-y-3"
          >
            <p className="text-red-400 font-bold">{item.duration}</p>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <h4 className="text-blue-400">{item.organization}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resume;
