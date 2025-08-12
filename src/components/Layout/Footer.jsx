import { motion, useReducedMotion } from "framer-motion";
import { Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/irfanfaiz25", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ahmad-irfan-faiz/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:ahmadirfanfaiz13@gmail.com", label: "Email" },
  ];

  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark-900/95 border-t border-primary-500/20 overflow-hidden">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-full blur-3xl top-1/2 left-1/4 will-animate-opacity"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                }
          }
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-accent-500/8 rounded-full blur-2xl bottom-1/3 right-1/3 will-animate-opacity"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  opacity: [0.03, 0.08, 0.03],
                }
          }
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/15 rounded-xl flex items-center justify-center glow-effect"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="text-primary-400" size={24} />
              </motion.div>
              <h3 className="text-3xl font-black gradient-text text-glow">
                Irfan Faiz
              </h3>
            </motion.div>
            <p className="text-gray-300 leading-relaxed text-lg font-medium">
              Backend Developer & Web Developer. Crafting digital experiences
              with passion, precision, and purpose.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/15 hover:from-primary-500/30 hover:to-accent-500/25 rounded-xl flex items-center justify-center transition-all duration-300 group glow-effect border-2 border-transparent hover:border-primary-500/30"
                  >
                    <Icon
                      className="text-primary-400 group-hover:text-primary-300"
                      size={20}
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-accent-500/15 rounded-xl flex items-center justify-center glow-effect"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <ArrowUp className="text-primary-400" size={20} />
              </motion.div>
              <h4 className="text-2xl font-black text-white">Quick Links</h4>
            </div>
            <ul className="space-y-3">
              <motion.li>
                <motion.a
                  href="#home"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="text-gray-400 hover:text-primary-400 transition-all duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-500/10 font-medium"
                >
                  <span>Home</span>
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="#about"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="text-gray-400 hover:text-primary-400 transition-all duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-500/10 font-medium"
                >
                  <span>About</span>
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="#projects"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="text-gray-400 hover:text-primary-400 transition-all duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-500/10 font-medium"
                >
                  <span>Projects</span>
                </motion.a>
              </motion.li>
              <motion.li>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ x: 8, scale: 1.05 }}
                  className="text-gray-400 hover:text-primary-400 transition-all duration-300 flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-500/10 font-medium"
                >
                  <span>Contact</span>
                </motion.a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Info - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-accent-500/15 rounded-xl flex items-center justify-center glow-effect"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="text-primary-400" size={20} />
              </motion.div>
              <h4 className="text-2xl font-black text-white">Get in Touch</h4>
            </div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-4 text-gray-300 hover:text-primary-400 transition-all duration-300 p-3 rounded-xl hover:bg-primary-500/10 border-2 border-transparent hover:border-primary-500/30"
              >
                <Mail size={18} className="text-primary-500" />
                <span className="font-medium">irfanfaiz25@gmail.com</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-4 text-gray-300 hover:text-primary-400 transition-all duration-300 p-3 rounded-xl hover:bg-primary-500/10 border-2 border-transparent hover:border-primary-500/30"
              >
                <Github size={18} className="text-primary-500" />
                <span className="font-medium">github.com/irfanfaiz25</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center space-x-4 text-gray-300 hover:text-primary-400 transition-all duration-300 p-3 rounded-xl hover:bg-primary-500/10 border-2 border-transparent hover:border-primary-500/30"
              >
                <Linkedin size={18} className="text-primary-500" />
                <span className="font-medium">linkedin.com/in/irfanfaiz25</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider - Enhanced */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent mb-8 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-500/30 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Bottom Section - Enhanced */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="text-gray-300 font-medium mb-2">
              © {currentYear} Irfan Faiz. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
              <span>Made with</span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-1"
              >
                <Heart className="text-red-500 fill-current" size={16} />
              </motion.span>
              <span>using React, Framer Motion & Tailwind CSS</span>
            </p>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-3 bg-gradient-to-r from-primary-500/20 to-accent-500/15 hover:from-primary-500/30 hover:to-accent-500/25 px-6 py-3 rounded-xl text-primary-400 hover:text-primary-300 transition-all duration-300 group border-2 border-primary-500/30 hover:border-primary-500/50 glow-effect"
          >
            <span className="font-bold">Back to Top</span>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={18} className="group-hover:text-primary-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
