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
} from "lucide-react";
import { EducationData } from "../../assets/data/education";
import { CertificationData } from "../../assets/data/certification";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Modal state
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal handlers
  const openModal = (certification) => {
    setSelectedCertificate(certification);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = "unset"; // Restore scroll
  };

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
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-orange-500/15 to-red-500/10 rounded-full blur-3xl top-1/4 left-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 270, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-orange-500/15 rounded-full blur-2xl bottom-1/3 right-1/3"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.25, 0.05],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-48 h-48 bg-orange-400/10 rounded-full blur-xl top-2/3 right-1/4"
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 9,
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
          {/* Section Header - Creative Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-orange-400">
                  <GraduationCap size={16} />
                  <span>Learning Journey</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                  <span className="text-white">Education &</span>
                  <br />
                  <span className="gradient-text text-glow">
                    Certifications
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  My academic foundation and professional certifications that
                  fuel continuous innovation and expertise in cutting-edge
                  technologies.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden lg:block">
              <div className="relative">
                <motion.div
                  className="w-64 h-64 mx-auto relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-orange-400/30"></div>
                  <div className="absolute inset-8 rounded-full border border-orange-400/40"></div>
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-orange-500/15 to-red-500/10 flex items-center justify-center">
                    <GraduationCap
                      className="text-orange-400 text-glow"
                      size={56}
                    />
                  </div>

                  {/* Floating Education Icons */}
                  <motion.div
                    className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-orange-500/30 to-red-500/20 rounded-xl flex items-center justify-center"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <BookOpen size={20} className="text-orange-400" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 w-10 h-10 bg-gradient-to-br from-red-500/30 to-orange-500/20 rounded-xl flex items-center justify-center"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [360, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Award size={20} className="text-red-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap className="text-white" size={24} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">
                  Academic <span className="gradient-text">Background</span>
                </h3>
              </div>

              <div className="space-y-6">
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
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="glass-effect p-6 rounded-xl group cursor-pointer border-l-4 border-orange-500/50 hover:border-orange-400"
                  >
                    {/* Timeline Indicator */}
                    <div className="flex items-start">
                      <motion.div
                        className="w-4 h-4 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="absolute w-4 h-4 bg-orange-400 rounded-full"
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

                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-200">
                          {education.institution}
                        </h4>

                        <div className="flex items-center text-orange-400 mb-2">
                          <BookOpen size={16} className="mr-2" />
                          <span className="font-medium">{education.major}</span>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span>{education.timeSpan}</span>
                        </div>

                        {education.note && (
                          <div className="mt-3">
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                              {education.note}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-8">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Award className="text-white" size={24} />
                </motion.div>
                <h3 className="text-3xl font-bold text-white">
                  Professional{" "}
                  <span className="gradient-text">Certifications</span>
                </h3>
              </div>

              <div className="space-y-6">
                {CertificationData.map((certification, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 50 },
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
                    whileHover={{ scale: 1.02, x: -10 }}
                    className="glass-effect p-6 rounded-xl group cursor-pointer border-r-4 border-red-500/50 hover:border-red-400"
                  >
                    <div className="flex items-center">
                      {/* Certificate Image - Now clickable */}
                      <motion.div
                        className="w-24 h-20 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 cursor-pointer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        onClick={() =>
                          certification.image && openModal(certification)
                        }
                      >
                        {certification.image ? (
                          <img
                            src={certification.image}
                            alt={certification.name}
                            className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity duration-200"
                          />
                        ) : (
                          <Award className="text-orange-400" size={24} />
                        )}
                      </motion.div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                          {certification.name}
                        </h4>

                        <p className="text-gray-400 text-base mb-1">
                          {certification.publisher}
                        </p>

                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar size={16} className="mr-2" />
                          <span>{certification.year}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add More Certifications Placeholder */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: CertificationData.length * 0.2,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="glass-effect p-6 rounded-xl border-2 border-dashed border-orange-500/30 text-center group hover:border-orange-500/50 transition-colors duration-200"
                >
                  <motion.div
                    className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl">📚</span>
                  </motion.div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    Continuous Learning
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Always pursuing new certifications and expanding knowledge
                    in emerging technologies.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Education Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center glass-effect p-8 rounded-2xl border border-orange-500/20"
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/15 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="text-orange-400" size={32} />
            </motion.div>
            <h4 className="text-2xl font-bold mb-4 gradient-text">
              Learning Philosophy
            </h4>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Education is a lifelong journey. While formal education provided
              the foundation, I believe in continuous learning through hands-on
              projects, online courses, and staying updated with industry trends
              and best practices.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl border border-orange-500/20 max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeModal}
            >
              <X size={20} />
            </motion.button>

            {/* Modal Header */}
            <div className="p-6 border-b border-orange-500/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedCertificate.name}
              </h3>
              <div className="flex items-center text-orange-400">
                <Award size={16} className="mr-2" />
                <span className="font-medium">
                  {selectedCertificate.publisher}
                </span>
                <span className="mx-2 text-gray-500">•</span>
                <Calendar size={16} className="mr-2" />
                <span>{selectedCertificate.year}</span>
              </div>
            </div>

            {/* Certificate Image */}
            <div className="p-6">
              <motion.div
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                />
              </motion.div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0">
              <motion.button
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
