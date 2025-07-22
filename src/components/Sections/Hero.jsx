import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Code,
  Database,
  Globe,
  Server,
  ArrowRight,
  Mail,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import profileImage from "../../assets/img/profil.jpg";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Backend Developer",
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  // Typewriter effect
  useEffect(() => {
    const currentText = roles[currentRole];
    let timeout;

    if (isTyping && !isDeleting) {
      // Typing forward
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause duration
      }
    } else if (isDeleting) {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Deleting speed (faster)
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, currentRole, isTyping, isDeleting, roles]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden mt-16 md:mt-0"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0">
        {/* Large Orange Geometric Shape - Responsive */}
        <motion.div
          className="absolute top-0 right-0 w-full md:w-2/3 h-full"
          initial={{ x: "100%" }}
          animate={{ x: { base: "30%", md: "20%" } }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/15 md:from-primary-500/20 via-accent-500/8 md:via-accent-500/10 to-transparent transform skew-x-6 md:skew-x-12 origin-top-right" />
            <div className="absolute top-10 md:top-20 right-10 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-primary-400/20 md:from-primary-400/30 to-accent-400/15 md:to-accent-400/20 rounded-full blur-2xl md:blur-3xl" />
          </div>
        </motion.div>

        {/* Floating Geometric Elements - Responsive */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 md:w-32 h-16 md:h-32 border-2 border-primary-400/30 rotate-45"
          animate={{
            rotate: [45, 225, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-12 md:w-24 h-12 md:h-24 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tech Icons Constellation - Desktop Only */}
        {[Code, Database].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute hidden md:block text-primary-400/30"
            style={{
              left: `${15 + index * 12}%`,
              top: `${20 + index * 12}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={32 + index * 8} />
          </motion.div>
        ))}
      </div>

      {/* Main Content - Mobile-First Responsive Layout */}
      <div className="container-custom relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Mobile Profile Photo - Shown only on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:hidden order-1 flex justify-center mb-8"
          >
            <div className="relative w-48 h-48">
              {/* Mobile Decorative Circle */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-400/30"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Mobile Profile Photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-3 border-primary-400/20 shadow-xl">
                    <img
                      src={profileImage}
                      alt="Irfan Faiz Profile"
                      className="w-full h-full object-cover object-center scale-110"
                      style={{
                        filter:
                          "drop-shadow(0 0 15px rgba(251, 146, 60, 0.3)) brightness(1.05) contrast(1.1)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Text Content - Responsive */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Status Badge - Responsive */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center space-x-2 glass-effect px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium text-primary-400 glow-effect">
                <span className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span>Available for opportunities</span>
              </span>
            </motion.div>

            {/* Large Typography - Responsive */}
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none"
              >
                <div className="text-white/90">AHMAD IRFAN</div>
                <div className="gradient-text text-glow">FAIZ</div>
              </motion.div>

              {/* Dynamic Role with Typewriter Effect - Responsive */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative h-12 md:h-16 lg:h-20 overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold gradient-text-alt">
                    {displayedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block ml-1 w-0.5 h-4 md:h-6 lg:h-8 xl:h-10 bg-orange-500"
                    />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Description - Responsive */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            >
              Crafting innovative backend solutions and immersive web
              experiences. I turn complex problems into elegant, scalable
              applications.
            </motion.p>

            {/* CTA Buttons - Responsive */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/50 glow-effect text-sm md:text-base"
              >
                <span>Explore Work</span>
                <ArrowRight size={18} className="md:hidden" />
                <ArrowRight size={20} className="hidden md:block" />
              </motion.a>

              {/* CV Download Button */}
              <motion.a
                href="/pdf/ATS-Friendly-CV-Ahmad Irfan Faiz.pdf"
                download="Ahmad_Irfan_Faiz_CV.pdf"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-3 glass-effect-alt hover:bg-green-500/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 border-2 border-green-500/50 hover:border-green-400 text-sm md:text-base"
              >
                <span>Download CV</span>
                <Download size={18} className="md:hidden" />
                <Download size={20} className="hidden md:block" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-3 glass-effect-alt hover:bg-primary-500/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 border-2 border-primary-500/50 hover:border-primary-400 text-sm md:text-base"
              >
                <span>Let's Talk</span>
                <Mail size={18} className="md:hidden" />
                <Mail size={20} className="hidden md:block" />
              </motion.a>
            </motion.div>
          </div>

          {/* Desktop Profile Photo - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block order-1 lg:order-2"
          >
            <div className="relative w-full h-96">
              {/* Large Decorative Circle */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary-400/30"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Inner Glowing Circle */}
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Profile Photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-primary-400/20 shadow-2xl">
                    <img
                      src={profileImage}
                      alt="Irfan Faiz Profile"
                      className="w-full h-full object-cover object-center scale-110"
                      style={{
                        filter:
                          "drop-shadow(0 0 20px rgba(251, 146, 60, 0.4)) brightness(1.05) contrast(1.1)",
                      }}
                    />
                    {/* Subtle overlay for better integration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full" />
                  </div>
                  {/* Floating Tech Icons around photo */}
                  {[Code, Database, Server, Globe].map((Icon, index) => (
                    <motion.div
                      key={index}
                      className="absolute text-primary-400/60"
                      style={{
                        left: `${30 + Math.cos((index * Math.PI) / 2) * 110}px`,
                        top: `${30 + Math.sin((index * Math.PI) / 2) * 110}px`,
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 8 + index * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon size={24} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 md:bottom-8 left-4 md:left-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex items-center space-x-2 md:space-x-3 text-primary-400"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary-400 to-transparent"></div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs md:text-sm font-medium">Scroll</span>
            <span className="text-xs opacity-70 hidden md:block">
              to explore
            </span>
          </div>
          <ChevronDown size={14} className="md:hidden" />
          <ChevronDown size={16} className="hidden md:block" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
