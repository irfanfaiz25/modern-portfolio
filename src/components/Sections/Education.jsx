import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  X,
  Star,
  Trophy,
  Target,
  CheckCircle,
} from "lucide-react";
import { EducationData } from "../../assets/data/education";
import { CertificationData } from "../../assets/data/certification";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Tab state
  const [activeTab, setActiveTab] = useState("education");

  // Modal state
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal handlers
  const openModal = (certification) => {
    setSelectedCertificate(certification);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = "unset";
  };

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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-full blur-3xl top-1/4 left-1/4"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-orange-500/8 rounded-full blur-2xl bottom-1/3 right-1/3"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 15,
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
          {/* Modern Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 glass-effect px-6 py-3 rounded-full text-sm font-medium text-orange-400 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <GraduationCap size={18} />
              <span>Academic & Professional Journey</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              <span className="text-white">Learning &</span>
              <br />
              <span className="gradient-text text-glow">Achievements</span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              A comprehensive overview of my educational foundation and
              professional certifications that drive innovation and expertise.
            </p>
          </motion.div>

          {/* Modern Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex justify-center">
              <div className="glass-effect p-2 rounded-2xl inline-flex space-x-2">
                <motion.button
                  onClick={() => setActiveTab("education")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === "education"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GraduationCap size={20} />
                  <span>Education</span>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab("certifications")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === "certifications"
                      ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Award size={20} />
                  <span>Certifications</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div className="relative min-h-[600px]">
            {/* Education Tab */}
            {activeTab === "education" && (
              <motion.div
                key="education"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Timeline */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-orange-500 opacity-30"></div>

                  <div className="space-y-8">
                    {EducationData.map((education, index) => (
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
                        className="relative"
                      >
                        {/* Timeline Node */}
                        <motion.div
                          className="absolute left-6 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full border-4 border-dark-900 z-10"
                          whileHover={{ scale: 1.5 }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(249, 115, 22, 0.7)",
                              "0 0 0 10px rgba(249, 115, 22, 0)",
                              "0 0 0 0 rgba(249, 115, 22, 0)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        />

                        {/* Card */}
                        <motion.div
                          className="ml-16 glass-effect p-6 rounded-2xl group cursor-pointer border border-orange-500/20 hover:border-orange-400/40"
                          whileHover={{
                            scale: 1.02,
                            y: -5,
                            boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                                {education.institution}
                              </h4>

                              <div className="flex items-center text-orange-400 mb-2">
                                <BookOpen size={16} className="mr-2" />
                                <span className="font-medium">
                                  {education.major}
                                </span>
                              </div>

                              <div className="flex items-center text-gray-400 text-sm">
                                <Calendar size={16} className="mr-2" />
                                <span>{education.timeSpan}</span>
                              </div>
                            </div>

                            <motion.div
                              className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-xl flex items-center justify-center"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <GraduationCap
                                className="text-orange-400"
                                size={24}
                              />
                            </motion.div>
                          </div>

                          {education.note && (
                            <motion.div
                              className="mt-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <span className="inline-flex items-center px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                                <Star size={12} className="mr-1" />
                                {education.note}
                              </span>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Education Stats */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="glass-effect p-8 rounded-2xl border border-orange-500/20">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/15 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Target className="text-orange-400" size={32} />
                    </motion.div>

                    <h4 className="text-2xl font-bold mb-4 gradient-text text-center">
                      Learning Philosophy
                    </h4>

                    <p className="text-gray-400 leading-relaxed text-center mb-6">
                      Education is a lifelong journey. Combining formal
                      education with continuous learning through practical
                      projects and industry trends.
                    </p>

                    {/* <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-orange-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-orange-400">
                          {EducationData.length}
                        </div>
                        <div className="text-sm text-gray-400">Degrees</div>
                      </div>
                      <div className="text-center p-4 bg-red-500/10 rounded-xl">
                        <div className="text-2xl font-bold text-red-400">∞</div>
                        <div className="text-sm text-gray-400">Learning</div>
                      </div>
                    </div> */}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Certifications Tab */}
            {activeTab === "certifications" && (
              <motion.div
                key="certifications"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {CertificationData.map((certification, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
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
                    className="group"
                  >
                    <motion.div
                      className="glass-effect p-6 rounded-2xl cursor-pointer border border-red-500/20 hover:border-red-400/40 h-full"
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        certification.image && openModal(certification)
                      }
                    >
                      {/* Certificate Image */}
                      <motion.div
                        className="w-full h-32 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-4 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        {certification.image ? (
                          <img
                            src={certification.image}
                            alt={certification.name}
                            className="w-full h-full object-cover rounded-xl group-hover:opacity-80 transition-opacity duration-200"
                          />
                        ) : (
                          <Award className="text-red-400" size={32} />
                        )}
                      </motion.div>

                      {/* Certificate Info */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                          {certification.name}
                        </h4>

                        <p className="text-gray-400 text-sm">
                          {certification.publisher}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-400 text-sm">
                            <Calendar size={14} className="mr-2" />
                            <span>{certification.year}</span>
                          </div>

                          <motion.div
                            className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle className="text-red-400" size={16} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Add More Placeholder */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: CertificationData.length * 0.1,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="group"
                >
                  <motion.div
                    className="glass-effect p-6 rounded-2xl border-2 border-dashed border-red-500/30 text-center group hover:border-red-500/50 transition-colors duration-200 h-full flex flex-col justify-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Trophy className="text-red-400" size={24} />
                    </motion.div>

                    <h4 className="text-lg font-semibold text-red-400 mb-2">
                      More Coming Soon
                    </h4>

                    <p className="text-gray-400 text-sm">
                      Continuously pursuing new certifications and expanding
                      expertise.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Certificate Modal - Optimized */}
      {isModalOpen && selectedCertificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} // Reduced from 0.2 to 0.15
        >
          {/* Backdrop - Optimized */}
          <motion.div
            className="absolute inset-0 bg-black/80" // Removed backdrop-blur-sm for better performance
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }} // Faster backdrop animation
            onClick={closeModal}
          />

          {/* Modal Content - Optimized animations */}
          <motion.div
            className="relative bg-gray-900/95 rounded-2xl border border-red-500/20 max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }} // Reduced scale change from 0.8 to 0.9
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.2, // Reduced from 0.3 to 0.2
              ease: "easeOut",
              type: "spring", // Added spring for smoother feel
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Close Button - Optimized */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center text-white transition-colors duration-150" // Reduced duration from 200 to 150
              whileHover={{ scale: 1.05 }} // Reduced from 1.1 to 1.05
              whileTap={{ scale: 0.95 }} // Reduced from 0.9 to 0.95
              transition={{ duration: 0.1 }} // Added faster transition
              onClick={closeModal}
            >
              <X size={20} />
            </motion.button>

            {/* Modal Header - Simplified animation */}
            <div className="p-6 border-b border-red-500/20">
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {selectedCertificate.name}
              </motion.h3>
              <motion.div
                className="flex items-center text-red-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                <Award size={16} className="mr-2" />
                <span className="font-medium">
                  {selectedCertificate.publisher}
                </span>
                <span className="mx-2 text-gray-500">•</span>
                <Calendar size={16} className="mr-2" />
                <span>{selectedCertificate.year}</span>
              </motion.div>
            </div>

            {/* Certificate Image - Optimized loading */}
            <div className="p-6">
              <motion.div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/5"
                initial={{ scale: 0.95, opacity: 0 }} // Reduced scale change
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1, // Reduced delay from 0.2 to 0.1
                  duration: 0.25, // Reduced from 0.3 to 0.25
                  ease: "easeOut",
                }}
              >
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                  loading="lazy" // Added lazy loading for better performance
                  style={{
                    willChange: "transform", // Optimize for animations
                    backfaceVisibility: "hidden", // Prevent flickering
                  }}
                />
              </motion.div>
            </div>

            {/* Modal Footer - Simplified */}
            <div className="p-6 pt-0">
              <motion.button
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-150 flex items-center justify-center space-x-2" // Reduced duration
                whileHover={{ scale: 1.01 }} // Reduced from 1.02 to 1.01
                whileTap={{ scale: 0.99 }} // Reduced from 0.98 to 0.99
                transition={{ duration: 0.1 }} // Added faster transition
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={closeModal}
              >
                <span>Close Certificate</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Education;
