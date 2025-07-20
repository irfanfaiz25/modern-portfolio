import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ImpactHighlightsData } from "../../assets/data/ImpactHighlights";
import { FutureGoalsData } from "../../assets/data/FutureGoals";
import {
  Code2,
  GitFork,
  Rocket,
  Users,
  Cpu,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";

const Highlight = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [counters, setCounters] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const iconMap = {
    Code2,
    GitFork,
    Rocket,
    Users,
    Cpu,
  };

  // Extract numbers from highlights for counter animation
  const extractNumber = (text) => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Counter animation effect
  useEffect(() => {
    if (isVisible) {
      const timers = [];
      ImpactHighlightsData.forEach((item, index) => {
        const targetNumber = extractNumber(item.highlight);
        if (targetNumber > 0) {
          let current = 0;
          const increment = targetNumber / 50;
          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
              current = targetNumber;
              clearInterval(timer);
            }
            setCounters((prev) => ({ ...prev, [index]: Math.floor(current) }));
          }, 30);
          timers.push(timer);
        }
      });

      // Cleanup function
      return () => {
        timers.forEach((timer) => clearInterval(timer));
      };
    }
  }, [isVisible]);

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-primary-400/20 rotate-45"
        />
        <motion.div
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-accent-400/30 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
          onViewportEnter={() => setIsVisible(true)}
        >
          {/* Impact Highlights - Enhanced Title */}
          <motion.div
            variants={itemVariants}
            className="mb-20"
            onViewportEnter={() => setIsVisible(true)}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 backdrop-blur-sm border border-primary-500/30 px-6 py-3 rounded-full text-sm font-semibold text-primary-300 mb-8"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <TrendingUp size={18} />
                <span>Impact Metrics</span>
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                Measurable{" "}
                <span className="gradient-text text-glow">Achievements</span>
              </h3>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Key milestones and quantifiable results from my development
                journey
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ImpactHighlightsData.map((item, index) => {
                const number = extractNumber(item.highlight);
                const currentCount = counters[index] || 0;

                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut",
                        },
                      },
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    className="group relative"
                    onViewportEnter={() => {
                      if (!isVisible) {
                        setIsVisible(true);
                      }
                    }}
                  >
                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/10">
                      {/* Number/Highlight */}
                      <div className="mb-6">
                        {number > 0 ? (
                          <div className="space-y-2">
                            <motion.div
                              className="text-4xl md:text-5xl font-black gradient-text"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: index * 0.2 + 0.3,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                              }}
                            >
                              {currentCount}
                              {item.highlight.includes("+") && "+"}
                            </motion.div>
                            <motion.div
                              className="text-sm font-semibold text-primary-400 uppercase tracking-wider"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + 0.5 }}
                            >
                              {item.highlight.replace(/\d+\+?\s*/g, "").trim()}
                            </motion.div>
                          </div>
                        ) : (
                          <motion.div
                            className="text-2xl md:text-3xl font-bold gradient-text capitalize"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 0.3 }}
                          >
                            {item.highlight}
                          </motion.div>
                        )}
                      </div>

                      {/* Description */}
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.6 }}
                      >
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {item.text}
                          {number === 0 && (
                            <span className="gradient-text font-semibold">
                              {item.highlight}
                            </span>
                          )}
                          {item.suffix}
                        </p>
                      </motion.div>

                      {/* Subtle Progress Indicator */}
                      {number > 0 && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-b-2xl"
                          initial={{ width: 0 }}
                          animate={{ width: isVisible ? "100%" : 0 }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.3 + 0.8,
                            ease: "easeOut",
                          }}
                        />
                      )}

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:to-accent-500/5 rounded-2xl transition-all duration-500" />

                      {/* Corner Accent */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom Decorative Line */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Future Goals - Distinguished Style */}
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent-500/20 to-primary-500/20 backdrop-blur-sm border border-accent-500/30 px-6 py-3 rounded-full text-sm font-semibold text-accent-300 mb-8"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Target size={18} />
              <span>Strategic Planning</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
              Future <span className="gradient-text text-glow">Roadmap</span>
            </h3>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Strategic goals and aspirations for continued professional growth
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 opacity-30" />

            <div className="space-y-8">
              {FutureGoalsData.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.2,
                          ease: "easeOut",
                        },
                      },
                    }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="relative flex items-start group"
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mr-8 group-hover:shadow-xl group-hover:shadow-accent-500/50 transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {IconComponent && (
                        <IconComponent className="text-white" size={24} />
                      )}

                      {/* Pulse Effect */}
                      {/* <motion.div
                        className="absolute inset-0 rounded-full bg-accent-500/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      /> */}
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      className="flex-1 glass-effect p-6 rounded-xl group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all duration-400"
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">
                        {item.text}
                        <span className="gradient-text">{item.highlight}</span>
                      </h4>
                      <p className="text-gray-400 leading-relaxed">
                        {item.suffix}
                      </p>

                      {/* Progress Indicator */}
                      {/* <div className="mt-4 flex items-center space-x-2">
                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: isVisible ? `${30 + index * 15}%` : 0,
                            }}
                            transition={{ duration: 1.5, delay: index * 0.3 }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {30 + index * 15}%
                        </span>
                      </div> */}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlight;
