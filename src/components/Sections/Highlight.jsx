import { motion } from "framer-motion";
import { ImpactHighlightsData } from "../../assets/data/ImpactHighlights";
import { FutureGoalsData } from "../../assets/data/FutureGoals";
import { Code2, GitFork, Rocket, Users, Cpu } from "lucide-react";

const Highlight = () => {
  const iconMap = {
    Code2,
    GitFork,
    Rocket,
    Users,
    Cpu,
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
    <section
      id="about"
      className="py-20 relative overflow-hidden container-custom"
    >
      {/* Impact Highlights */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold gradient-text-alt mb-4">
            Impact Highlights
          </h3>
          <p className="text-gray-400">
            Measurable results from my development journey
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {ImpactHighlightsData.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
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
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect-alt p-6 rounded-xl hover-lift border-2 border-transparent hover:border-primary-500/30 transition-all duration-500"
            >
              <p className="text-lg leading-relaxed">
                <span className="text-gray-300">{item.text}</span>
                <span className="gradient-text font-semibold">
                  {item.highlight}
                </span>
                <span className="text-gray-300">{item.suffix}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Future Goals */}
      <motion.div variants={itemVariants}>
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-white mb-4">
            Future <span className="gradient-text">Aspirations</span>
          </h3>
          <p className="text-gray-400 text-lg">
            Where I'm heading next in my development journey
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {FutureGoalsData.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="glass-effect p-6 rounded-xl group cursor-pointer hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-400"
              >
                <div className="flex items-start">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:shadow-lg group-hover:shadow-accent-500/50 transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {IconComponent && (
                      <IconComponent className="text-white" size={24} />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                      {item.text}
                      <span className="gradient-text">{item.highlight}</span>
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.suffix}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Highlight;
