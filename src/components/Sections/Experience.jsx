import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award, ChevronRight } from 'lucide-react';
import { ExperienceData } from '../../assets/data/experiences';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/15 to-accent-500/10 rounded-full blur-3xl top-1/4 left-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-accent-500/15 rounded-full blur-2xl bottom-1/3 right-1/3"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.25, 0.05],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-primary-400/20 rounded-full blur-xl top-2/3 left-1/2"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header - Creative Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              variants={itemVariants}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-primary-400">
                  <Briefcase size={16} />
                  <span>Career Journey</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="text-white">Professional</span><br/>
                  <span className="gradient-text text-glow">Experience</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  My evolution through diverse roles and challenging projects, 
                  mastering backend development, web technologies, and leadership.
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
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-primary-400/30"></div>
                  <div className="absolute inset-6 rounded-full border border-accent-400/40"></div>
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary-500/15 to-accent-500/10 flex items-center justify-center">
                    <Briefcase className="text-primary-400 text-glow" size={56} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 transform md:-translate-x-0.5"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {ExperienceData.map((experience, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: index % 2 === 0 ? -100 : 100,
                      scale: 0.8 
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.2,
                        ease: 'easeOut',
                      },
                    },
                  }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-900 transform md:-translate-x-2 z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="glass-effect p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Briefcase className="text-primary-400 mr-2" size={20} />
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-200">
                            {experience.as}
                          </h3>
                          {experience.position && (
                            <span className="ml-2 px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                              {experience.position}
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-lg font-semibold text-primary-400 mb-2">
                          {experience.companyName}
                        </h4>
                        
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>{experience.timeSpan}</span>
                          {experience.note && (
                            <span className="ml-2 text-primary-400 font-medium">
                              {experience.note}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {experience.description.map((desc, descIndex) => (
                            <motion.li
                              key={descIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + descIndex * 0.1 }}
                              className="flex items-start text-gray-300 text-sm leading-relaxed"
                            >
                              <ChevronRight size={16} className="text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{desc}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Achievements */}
                      {experience.key_achievements && (
                        <div className="border-t border-white/10 pt-4">
                          <div className="flex items-center mb-3">
                            <Award className="text-primary-400 mr-2" size={16} />
                            <span className="text-sm font-semibold text-primary-400">Key Achievements</span>
                          </div>
                          <ul className="space-y-2">
                            {experience.key_achievements.map((achievement, achIndex) => (
                              <motion.li
                                key={achIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + achIndex * 0.1 + 0.3 }}
                                className="flex items-start text-gray-300 text-sm leading-relaxed"
                              >
                                <ChevronRight size={16} className="text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: 'Years of Experience', value: '3+', icon: Calendar },
              { label: 'Companies Worked With', value: '6+', icon: Briefcase },
              { label: 'Projects Delivered', value: '10+', icon: Award },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect p-6 rounded-xl text-center group"
                >
                  <motion.div
                    className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="text-primary-400" size={24} />
                  </motion.div>
                  <h4 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;