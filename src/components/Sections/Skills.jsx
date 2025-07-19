import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Database, Globe, Wrench } from "lucide-react";
import { SkillsData } from "../../assets/data/skills";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced from 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced from y: 30
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced from 0.6
        ease: "easeOut",
      },
    },
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Backend Development":
        return Database;
      case "Frontend Development":
        return Globe;
      case "Database Management":
        return Database;
      case "Tools and Technologies":
        return Wrench;
      default:
        return Code;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Backend Development":
        return "from-blue-500 to-blue-600";
      case "Frontend Development":
        return "from-green-500 to-green-600";
      case "Database Management":
        return "from-purple-500 to-purple-600";
      case "Tools and Technologies":
        return "from-orange-500 to-orange-600";
      default:
        return "from-primary-500 to-primary-600";
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Simplified Background - Static elements only */}
      <div className="absolute inset-0">
        <div className="absolute w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/8 rounded-full blur-3xl top-1/3 right-1/4" />
        <div className="absolute w-64 h-64 bg-orange-500/8 rounded-full blur-2xl bottom-1/4 left-1/3" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
          >
            <span className="gradient-text text-glow">Technical Skills</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive toolkit of technologies and frameworks that power my
            development journey
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid gap-8 md:gap-12"
        >
          {Object.entries(SkillsData).map(([category, data], categoryIndex) => {
            const IconComponent = getCategoryIcon(category);
            const colorClass = getCategoryColor(category);

            return (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="glass-effect-alt rounded-2xl p-6 md:p-8 hover:bg-white/5 transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${colorClass} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent
                      size={24}
                      className="text-white md:w-8 md:h-8"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {category}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      {data.skills.length} Technologies
                    </p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {data.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() =>
                        setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                      }
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="relative group"
                    >
                      <div className="glass-effect rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary-400/50">
                        {/* Skill Icon */}
                        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="w-8 h-8 object-contain filter brightness-110"
                            loading="lazy"
                          />
                        </div>

                        {/* Skill Name */}
                        <h4 className="text-sm font-semibold text-white mb-2 leading-tight">
                          {skill.name}
                        </h4>

                        {/* Skill Level */}
                        {/* <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                          <div
                            className={`bg-gradient-to-r ${colorClass} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${skill.level || 80}%` }}
                          />
                        </div> */}

                        {/* <span className="text-xs text-gray-400 font-medium">
                          {skill.level || 80}%
                        </span> */}

                        {/* Hover Tooltip */}
                        {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg z-10 whitespace-nowrap"
                          >
                            {skill.experience ||
                              `Proficient with ${skill.name}`}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-dark-800" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
