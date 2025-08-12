import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

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

  // Animasi yang dioptimalkan
  const optimizedBackgroundAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1],
        },
        transition: {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const optimizedFloatingAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          rotate: [45, 135, 45],
          scale: [1, 1.02, 1],
        },
        transition: {
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  const optimizedProfileAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -3, 0],
        },
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden mt-16 md:mt-0"
    >
      {/* Geometric Background - Optimized */}
      <div className="absolute inset-0">
        {/* Large Orange Geometric Shape - Static untuk mobile */}
        <motion.div
          className="absolute top-0 right-0 w-full md:w-2/3 h-full will-animate-transform"
          initial={{ x: "100%" }}
          animate={{ x: { base: "30%", md: "20%" } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/15 md:from-primary-500/20 via-accent-500/8 md:via-accent-500/10 to-transparent transform skew-x-6 md:skew-x-12 origin-top-right" />
            <motion.div
              className="absolute top-10 md:top-20 right-10 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-primary-400/20 md:from-primary-400/30 to-accent-400/15 md:to-accent-400/20 rounded-full blur-2xl md:blur-3xl will-animate-opacity"
              {...optimizedBackgroundAnimation}
            />
          </div>
        </motion.div>

        {/* Floating Geometric Elements - Simplified */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 md:w-32 h-16 md:h-32 border-2 border-primary-400/30 rotate-45 will-animate-transform"
          {...optimizedFloatingAnimation}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-12 md:w-24 h-12 md:h-24 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full will-animate-opacity"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -15, 0],
                  opacity: [0.2, 0.3, 0.2],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tech Icons - Hanya di desktop dan animasi minimal */}
        {[Code, Database].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block text-primary-400/30 will-animate-opacity"
            style={{
              left: `${15 + index * 12}%`,
              top: `${20 + index * 12}%`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.2, 0.4, 0.2],
                  }
            }
            transition={{
              duration: 6 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={32 + index * 8} />
          </motion.div>
        ))}
      </div>

      {/* Main Content - Optimized animations */}
      <div className="container-custom relative z-10 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Mobile Profile Photo - Simplified animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:hidden order-1 flex justify-center mb-8"
          >
            <div className="relative w-48 h-48">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-400/30 will-animate-transform"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, 360],
                      }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  {...optimizedProfileAnimation}
                  className="relative will-animate-transform"
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

          {/* Text Content - Optimized */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center space-x-2 glass-effect px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium text-primary-400 glow-effect">
                <span className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full animate-pulse"></span>
                <span>Available for opportunities</span>
              </span>
            </motion.div>

            {/* Large Typography */}
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(2rem, 8vw, 6rem)",
                }}
              >
                <div className="text-white/90">AHMAD IRFAN</div>
                <div className="gradient-text text-glow">FAIZ</div>
              </motion.div>

              {/* Dynamic Role - Simplified */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative overflow-hidden"
                style={{
                  height: "clamp(3rem, 6vw, 5rem)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center lg:justify-start">
                  <span
                    className="font-bold gradient-text-alt"
                    style={{
                      fontSize: "clamp(1.125rem, 4vw, 2.5rem)",
                    }}
                  >
                    {displayedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block ml-1 w-0.5 bg-orange-500"
                      style={{
                        height: "clamp(1rem, 3vw, 2.5rem)",
                      }}
                    />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            >
              Crafting innovative backend solutions and immersive web
              experiences. I turn complex problems into elegant, scalable
              applications.
            </motion.p>

            {/* CTA Buttons - Simplified hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary-500/50 glow-effect text-sm md:text-base"
              >
                <span>Explore Work</span>
                <ArrowRight size={18} className="md:hidden" />
                <ArrowRight size={20} className="hidden md:block" />
              </motion.a>

              <motion.a
                href="/pdf/ATS-Friendly-CV-Ahmad Irfan Faiz.pdf"
                download="Ahmad_Irfan_Faiz_CV.pdf"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center space-x-3 glass-effect-alt hover:bg-green-500/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 border-2 border-green-500/50 hover:border-green-400 text-sm md:text-base"
              >
                <span>Download CV</span>
                <Download size={18} className="md:hidden" />
                <Download size={20} className="hidden md:block" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center space-x-3 glass-effect-alt hover:bg-primary-500/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white transition-all duration-300 border-2 border-primary-500/50 hover:border-primary-400 text-sm md:text-base"
              >
                <span>Let's Talk</span>
                <Mail size={18} className="md:hidden" />
                <Mail size={20} className="hidden md:block" />
              </motion.a>
            </motion.div>
          </div>

          {/* Desktop Profile Photo - Optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block order-1 lg:order-2"
          >
            <div className="relative w-full h-96">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary-400/30 will-animate-transform"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, 360],
                      }
                }
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm will-animate-opacity"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: [1, 1.02, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  {...optimizedProfileAnimation}
                  className="relative will-animate-transform"
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
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-primary-400 transition-colors duration-300"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
