import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// contact section 
const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const infos = infoRefs.current;

    // Section fade-in animation
    gsap.fromTo(
      section,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      }
    );

    // Form slide-in animation
    gsap.fromTo(
      form,
      { opacity: 0, x: 0 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Contact info fade-in animation
    infos.forEach((info, index) => {
      gsap.fromTo(
        info,
        { opacity: 0, x: 0 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section ref={sectionRef} className="py-16 mt-10">
      <div className="mx-auto px-4 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-200 mb-10">
          <span className="text-indigo-600">Contact </span> Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 dark:bg-gray-500 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 dark:bg-gray-500 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-3 dark:bg-gray-500 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
              <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all"
              >
                Send Message
              </button>
              </div>

            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div
              ref={(el) => (infoRefs.current[0] = el)}
              className="flex items-center space-x-4 bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md"
            >
              <Mail className="text-indigo-600" size={40} />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email</p>
                <p className="text-gray-600 dark:text-gray-400">titdevelopercommunity@gmail.com</p>
              </div>
            </div>
            <div
              ref={(el) => (infoRefs.current[1] = el)}
              className="flex items-center space-x-4 bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md"
            >
              <Phone className="text-green-500" size={40} />
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</p>
                <p className="text-gray-600 dark:text-gray-400">+919179730898</p>
                <p className="text-gray-600 dark:text-gray-400">+917870793511</p>
              </div>
            </div>
            <div
              ref={(el) => (infoRefs.current[2] = el)}
              className="flex items-center space-x-4 bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md">
              < Instagram className="text-pink-400" size={40} />
              <Link to="https://www.instagram.com/titdevelopercommunity?igsh=MWpkdGF1ZXJuZG1qag==">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Instagram</p>
                  <p className="text-gray-600 dark:text-gray-400">TIT Developer Community</p>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section >
  );
};

export default Contact;