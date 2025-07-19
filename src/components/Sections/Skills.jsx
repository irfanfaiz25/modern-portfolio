import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Database, Globe, Wrench, Star, TrendingUp } from "lucide-react";
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
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/15 rounded-full blur-3xl top-1/3 right-1/4"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-orange-500/15 rounded-full blur-2xl bottom-1/4 left-1/3"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.25, 0.05],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-40 h-40 bg-orange-400/10 rounded-full blur-xl top-1/2 left-1/4"
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
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
            <motion.div
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-orange-400">
                  <Code size={16} />
                  <span>Expertise</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="text-white">Technical</span><br/>
                  <span className="gradient-text text-glow">Skills</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  A comprehensive arsenal of cutting-edge technologies and frameworks, 
                  honed through real-world projects and continuous innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  className="w-64 h-64 mx-auto relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-orange-400/30"></div>
                  <div className="absolute inset-8 rounded-full border border-orange-400/40"></div>
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-orange-500/15 to-red-500/10 flex items-center justify-center">
                    <Code className="text-orange-400 text-glow" size={56} />
                  </div>
                  
                  {/* Floating Tech Icons */}
                  <motion.div
                    className="absolute top-4 right-8 w-8 h-8 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-lg flex items-center justify-center"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Database size={16} className="text-orange-400" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-8 left-4 w-8 h-8 bg-gradient-to-br from-red-500/30 to-orange-500/20 rounded-lg flex items-center justify-center"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Wrench size={16} className="text-red-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8 lg:gap-12">
            {Object.entries(SkillsData).map(
              ([category, data], categoryIndex) => {
                const Icon = getCategoryIcon(category);
                const colorClass = getCategoryColor(category);

                return (
                  <motion.div
                    key={category}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          delay: categoryIndex * 0.2,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group border-2 border-transparent hover:border-orange-500/30"
                  >
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center mr-6 glow-effect`}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="text-white" size={28} />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-black text-white group-hover:text-orange-400 transition-colors duration-200">
                          {category}
                        </h3>
                        {data.notes && (
                          <span className="text-sm text-orange-400 font-medium">
                            {data.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {data.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -5,
                            transition: { duration: 0.2 },
                          }}
                          onHoverStart={() =>
                            setHoveredSkill(`${category}-${skillIndex}`)
                          }
                          onHoverEnd={() => setHoveredSkill(null)}
                          className={`relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-400/50 transition-all duration-200 cursor-pointer group/skill ${
                            skill.borderColor || ""
                          }`}
                        >
                          {/* Skill Icon */}
                          <div className="flex flex-col items-center text-center">
                            <motion.div
                              className="w-12 h-12 mb-3 flex items-center justify-center"
                              animate={{
                                rotate:
                                  hoveredSkill === `${category}-${skillIndex}`
                                    ? 360
                                    : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <img
                                src={skill.logo}
                                alt={skill.name}
                                className="w-full h-full object-contain filter brightness-90 group-hover/skill:brightness-110 transition-all duration-200"
                              />
                            </motion.div>

                            {/* Skill Name */}
                            <h4 className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-200">
                              {skill.name}
                            </h4>
                          </div>

                          {/* Hover Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200"
                            initial={false}
                          />

                          {/* Skill Level Indicator */}
                          <motion.div
                            className="absolute top-2 right-2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200"
                            initial={false}
                          >
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={`${
                                    i < 4
                                      ? "text-orange-400 fill-current"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center glass-effect p-8 rounded-2xl border-2 border-orange-500/20"
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/15 rounded-full flex items-center justify-center mx-auto mb-6 glow-effect"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Code className="text-orange-400" size={32} />
            </motion.div>
            <h4 className="text-2xl font-bold mb-4 gradient-text">
              Continuous Learning
            </h4>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with
              the latest technologies and best practices in web development.
              Currently exploring React.js and modern frontend frameworks to
              become a well-rounded full-stack developer.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
