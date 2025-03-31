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
      { opacity: 0, y: 50 },
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
      { opacity: 0, x: -50 },
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
        { opacity: 0, x: 30 },
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
    <section ref={sectionRef} className="bg-gray-100 py-16 mt-10">
      <div className="container px-3">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Contact <span className="text-indigo-600">Us</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div
              ref={(el) => (infoRefs.current[0] = el)}
              className="flex items-center space-x-4 bg-white p-5 rounded-xl shadow-md"
            >
              <Mail className="text-indigo-600" size={40} />
              <div>
                <p className="text-lg font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">titdevelopercommunity@gmail.com</p>
              </div>
            </div>
            <div
              ref={(el) => (infoRefs.current[1] = el)}
              className="flex items-center space-x-4 bg-white p-5 rounded-xl shadow-md"
            >
              <Phone className="text-green-500" size={40} />
              <div>
                <p className="text-lg font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600">+919179730898</p>
                <p className="text-gray-600">+917870793511</p>
              </div>
            </div>
            <div
              ref={(el) => (infoRefs.current[2] = el)}
              className="flex items-center space-x-4 bg-white p-5 rounded-xl shadow-md">
              < Instagram className="text-pink-400" size={40} />
              <Link to="https://www.instagram.com/titdevelopercommunity?igsh=MWpkdGF1ZXJuZG1qag==">
                <div>
                  <p className="text-lg font-semibold text-gray-800">Instagram</p>
                  <p className="text-gray-600">TIT Developer Community</p>
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