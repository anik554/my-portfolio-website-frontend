"use client";

import { contact } from "@/actions/contact";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactComponent() {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    message: "",
  });

  console.log("form",form)

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    const res = await contact(form)

    if (res) {
      setStatus("Message sent successfully!");
      toast.success(res.message)
      setForm({ email: "", phone: "", message: "" });
      setLoading(true);
    } else {
      setStatus("Something went wrong. Try again!");
      toast.error(res.message)
      setLoading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 ">
      <div className="w-full rounded-xl overflow-hidden border">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.002079290297!2d90.34878937512595!3d23.75619100609056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf66b3c0a14f%3A0x777f459aa721862f!2sChadd%20Uddan%2C%20Mohammadpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
        ></iframe>
      </div>
      <div className="w-full bg-white dark:bg-neutral-900 border rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border bg-transparent"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-md border bg-transparent"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 rounded-md border bg-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}
