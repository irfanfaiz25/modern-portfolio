import { motion, useInView } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

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

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/5 rounded-full blur-3xl top-1/4 right-1/4"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-accent-500/10 rounded-full blur-2xl bottom-1/4 left-1/4"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 8,
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
          {/* Section Header with Unique Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-primary-400">
                  <Target size={16} />
                  <span>About Me</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="text-white">Crafting</span>
                  <br />
                  <span className="gradient-text text-glow">Digital</span>
                  <br />
                  <span className="text-white">Experiences</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm a passionate developer who transforms complex problems
                  into elegant, scalable solutions. With a strong foundation in
                  backend technologies and a growing expertise in full-stack
                  development.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="glass-effect-alt p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <Lightbulb className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        My Philosophy
                      </h3>
                      <p className="text-primary-400">Code with Purpose</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Every line of code I write is driven by the desire to solve
                    real problems and create meaningful experiences. I believe
                    great software combines technical excellence with
                    user-centric thinking.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
