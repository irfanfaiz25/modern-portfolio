import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validate environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitError(
        "EmailJS configuration is missing. Please check environment variables."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Send email using EmailJS with better error handling
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setIsSubmitting(false);

      // More specific error messages
      let errorMessage =
        "Failed to send message. Please try again or contact me directly.";
      if (error.status === 400) {
        errorMessage =
          "Invalid email configuration. Please contact the site administrator.";
      } else if (error.status === 401) {
        errorMessage = "Email service authentication failed.";
      } else if (error.status === 504) {
        errorMessage =
          "Email service is temporarily unavailable. Please try again later.";
      }

      setSubmitError(errorMessage);

      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitError("");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "irfanfaiz25@gmail.com",
      href: "mailto:irfanfaiz25@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 812-3456-7890",
      href: "tel:+6281234567890",
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Surakarta, Indonesia",
      href: "#",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/irfanfaiz25",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/irfanfaiz25",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:irfanfaiz25@gmail.com",
      color: "hover:text-red-400",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/15 to-accent-500/10 rounded-full blur-3xl top-1/4 right-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-accent-500/15 rounded-full blur-2xl bottom-1/3 left-1/3"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.25, 0.05],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-primary-400/10 rounded-full blur-xl top-1/2 left-1/4"
          animate={{
            x: [0, 40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header - Creative Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-primary-400">
                  <MessageCircle size={16} />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="text-white">Let's Create</span>
                  <br />
                  <span className="gradient-text text-glow">
                    Something Amazing
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Ready to transform your vision into reality? Let's collaborate
                  and build innovative solutions that make a difference.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="relative">
                <motion.div
                  className="w-64 h-64 mx-auto relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-primary-400/30"></div>
                  <div className="absolute inset-8 rounded-full border border-accent-400/40"></div>
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary-500/15 to-accent-500/10 flex items-center justify-center">
                    <MessageCircle
                      className="text-primary-400 text-glow"
                      size={56}
                    />
                  </div>

                  {/* Floating Contact Icons */}
                  <motion.div
                    className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-primary-500/30 to-accent-500/20 rounded-xl flex items-center justify-center"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Mail size={20} className="text-primary-400" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 w-10 h-10 bg-gradient-to-br from-accent-500/30 to-primary-500/20 rounded-xl flex items-center justify-center"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [360, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Phone size={20} className="text-accent-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8">
                Let's <span className="gradient-text">Connect</span>
              </h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: "easeOut",
                          },
                        },
                      }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center p-4 glass-effect rounded-xl group cursor-pointer"
                    >
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mr-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="text-white" size={20} />
                      </motion.div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-primary-400 transition-colors duration-200">
                          {info.label}
                        </h4>
                        <p className="text-gray-400 text-sm">{info.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.2, y: -5 }}
                        className={`w-12 h-12 glass-effect rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200`}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send a <span className="gradient-text">Message</span>
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="text-green-400" size={32} />
                    </motion.div>
                    <h4 className="text-xl font-bold text-green-400 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-400">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors duration-200"
                          placeholder="Your Name"
                        />
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="relative"
                      >
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors duration-200"
                          placeholder="Your Email"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors duration-200"
                        placeholder="Subject"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="relative"
                    >
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none transition-colors duration-200 resize-none"
                        placeholder="Your Message"
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
