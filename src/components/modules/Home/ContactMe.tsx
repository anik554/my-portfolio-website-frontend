import ContactComponent from "@/components/shared/ContactComponent";

const ContactMe = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-16">
      <h2 className="text-4xl font-bold text-center">Contact Me</h2>
      <article className="text-center text-gray-300 max-w-2xl mx-auto mt-3">
        I provide a wide range of modern, high-quality web solutions designed to
        help businesses grow, improve efficiency, and build a powerful digital
        presence.
      </article>
      <div className="my-5">
        <ContactComponent />
      </div>
    </div>
  );
};

export default ContactMe;
