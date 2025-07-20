import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SkillsData } from "../../assets/data/skills";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Track mouse movement untuk efek background yang halus
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Flatten semua skills menjadi array tunggal
  const allSkills = Object.values(SkillsData).flatMap(
    (category) => category.skills
  );

  // Pilih skills unggulan untuk ditampilkan
  const featuredSkills = allSkills.slice(0, 20);

  // Posisi icon untuk desktop
  const desktopPositions = [
    // Area atas
    { top: "8%", left: "20%", delay: 0 },
    { top: "12%", left: "50%", delay: 0.1 },
    { top: "8%", left: "80%", delay: 0.2 },
    { top: "18%", left: "35%", delay: 0.3 },
    { top: "18%", left: "65%", delay: 0.4 },
    // Area tengah atas
    { top: "28%", left: "15%", delay: 0.5 },
    { top: "32%", left: "85%", delay: 0.6 },
    { top: "35%", left: "25%", delay: 0.7 },
    { top: "35%", left: "75%", delay: 0.8 },
    // Area tengah (mengelilingi title)
    { top: "50%", left: "10%", delay: 0.9 },
    { top: "50%", left: "90%", delay: 1.0 },
    { top: "45%", left: "20%", delay: 1.1 },
    { top: "55%", left: "80%", delay: 1.2 },
    // Area tengah bawah
    { top: "65%", left: "25%", delay: 1.3 },
    { top: "65%", left: "75%", delay: 1.4 },
    { top: "68%", left: "15%", delay: 1.5 },
    { top: "72%", left: "85%", delay: 1.6 },
    // Area bawah
    { top: "82%", left: "35%", delay: 1.7 },
    { top: "82%", left: "65%", delay: 1.8 },
    { top: "88%", left: "50%", delay: 1.9 },
  ];

  // Posisi icon untuk mobile - lebih rapat dan terorganisir
  const mobilePositions = [
    // Baris atas
    { top: "15%", left: "25%", delay: 0 },
    { top: "15%", left: "50%", delay: 0.1 },
    { top: "15%", left: "75%", delay: 0.2 },

    // Baris kedua
    { top: "25%", left: "15%", delay: 0.3 },
    { top: "25%", left: "40%", delay: 0.4 },
    { top: "25%", left: "60%", delay: 0.5 },
    { top: "25%", left: "85%", delay: 0.6 },

    // Baris ketiga (di sekitar title)
    { top: "40%", left: "20%", delay: 0.7 },
    { top: "40%", left: "80%", delay: 0.8 },

    // Baris keempat (di bawah title)
    { top: "65%", left: "15%", delay: 0.9 },
    { top: "65%", left: "40%", delay: 1.0 },
    { top: "65%", left: "60%", delay: 1.1 },
    { top: "65%", left: "85%", delay: 1.2 },

    // Baris kelima
    { top: "75%", left: "25%", delay: 1.3 },
    { top: "75%", left: "50%", delay: 1.4 },
    { top: "75%", left: "75%", delay: 1.5 },

    // Baris bawah
    { top: "85%", left: "35%", delay: 1.6 },
    { top: "85%", left: "65%", delay: 1.7 },
    { top: "90%", left: "50%", delay: 1.8 },
    { top: "95%", left: "50%", delay: 1.9 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      },
    }),
  };

  // Animasi floating yang halus dengan variasi
  const subtleFloat = {
    y: [-3, 3, -3],
    x: [-1, 1, -1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="skills"
      className="py-12 md:py-20 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background halus */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/8 rounded-full blur-3xl"
          style={{
            left: mousePosition.x * 0.01 + "%",
            top: mousePosition.y * 0.01 + "%",
          }}
          transition={{ type: "spring", stiffness: 30, damping: 20 }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-orange-500/8 to-red-500/6 rounded-full blur-3xl"
          style={{
            right: mousePosition.x * 0.008 + "%",
            bottom: mousePosition.y * 0.008 + "%",
          }}
          transition={{ type: "spring", stiffness: 25, damping: 15 }}
        />
      </div>

      <div className="container-custom relative z-10 w-full px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative w-full h-screen flex items-center justify-center"
        >
          {/* Section Title - Benar-benar di tengah */}
          <motion.div
            variants={titleVariants}
            className="text-center z-20 relative px-4"
          >
            <motion.h2
              className="text-3xl md:text-6xl lg:text-7xl font-black mb-2 md:mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="gradient-text text-glow">My Tech Stack</span>
            </motion.h2>
            <motion.h3
              className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6 text-white/90"
              variants={titleVariants}
            >
              & Skills
            </motion.h3>
            <motion.p
              variants={titleVariants}
              className="text-sm md:text-lg text-gray-300 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2"
            >
              Showcasing the technologies I use and my core competencies in
              development.
            </motion.p>
          </motion.div>

          {/* Icon-icon Skills */}
          {featuredSkills.map((skill, index) => {
            // Gunakan posisi yang berbeda untuk mobile dan desktop
            const isMobile =
              typeof window !== "undefined" && window.innerWidth < 768;
            const positions = isMobile ? mobilePositions : desktopPositions;
            const position =
              positions[index] || positions[index % positions.length];

            return (
              <motion.div
                key={skill.name}
                custom={position.delay}
                variants={iconVariants}
                animate={{
                  ...subtleFloat,
                  transition: {
                    ...subtleFloat.transition,
                    delay: index * 0.1,
                  },
                }}
                className="absolute cursor-pointer z-10"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: "translate(-50%, -50%)",
                }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                {/* Container Icon */}
                <div className="relative group">
                  <motion.div
                    className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 glass-effect rounded-xl flex items-center justify-center border border-white/20 transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(59, 130, 246, 0.6)",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-5 h-5 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain filter brightness-110 transition-all duration-300"
                      loading="lazy"
                      whileHover={{
                        brightness: 1.4,
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {/* Tooltip yang Enhanced */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute -top-12 md:-top-14 left-1/2 transform -translate-x-1/2 z-30"
                    >
                      <div className="bg-dark-900/95 backdrop-blur-sm text-white text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 rounded-lg shadow-xl border border-white/20 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          {skill.name}
                        </div>
                        {skill.experience && (
                          <div className="text-xs text-gray-300 mt-1 text-center hidden md:block">
                            {skill.experience}
                          </div>
                        )}
                        {/* Arrow Tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-dark-900/95" />
                      </div>
                    </motion.div>
                  )}

                  {/* Efek Glow Halus saat Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 blur-lg transition-all duration-300"
                    whileHover={{
                      background:
                        "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Elemen Dekoratif Halus - Hidden pada mobile */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-400/60 rounded-full hidden md:block"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-orange-400/50 rounded-full hidden md:block"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-2/3 left-1/6 w-1 h-1 bg-green-400/40 rounded-full hidden md:block"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
