import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProjectsData } from "../../assets/data/projects";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get unique tech stacks for filtering
  const allTechStacks = [
    ...new Set(ProjectsData.flatMap((project) => project.techStack)),
  ];
  const filters = ["All", ...allTechStacks];

  // Filter projects based on selected filter
  const filteredProjects =
    filter === "All"
      ? ProjectsData
      : ProjectsData.filter((project) => project.techStack.includes(filter));

  // Image navigation handlers
  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getTechColor = (tech) => {
    const colors = {
      ReactJS: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Laravel: "bg-red-500/20 text-red-400 border-red-500/30",
      PHP: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      MySQL: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Tailwind: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      Bootstrap: "bg-purple-600/20 text-purple-300 border-purple-600/30",
      Livewire: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "Java Script": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Java: "bg-red-600/20 text-red-300 border-red-600/30",
      PostgreSQL: "bg-blue-600/20 text-blue-300 border-blue-600/30",
    };
    return colors[tech] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-primary-500/15 to-accent-500/10 rounded-full blur-3xl top-1/4 right-1/4"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-accent-500/10 rounded-full blur-2xl bottom-1/3 left-1/3"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: 10,
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
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full text-sm font-medium text-primary-400">
                <Filter size={16} />
                <span>Portfolio</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                <span className="text-white">Featured</span>
                <br />
                <span className="gradient-text text-glow">Projects</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                A curated collection of my development work, showcasing
                expertise in backend development, web technologies, and
                innovative problem-solving.
              </p>
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
                  <div className="absolute inset-0 rounded-full border-2 border-primary-400/20"></div>
                  <div className="absolute inset-8 rounded-full border border-accent-400/30"></div>
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                    <Filter className="text-primary-400 text-glow" size={48} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Filter Buttons - Enhanced Design */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === filterOption
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl shadow-primary-500/30 glow-effect"
                    : "glass-effect text-gray-300 hover:text-primary-400 hover:bg-primary-500/10"
                }`}
              >
                {filterOption}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="grid gap-8 md:gap-10" layout>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                layout
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
                whileHover={{ y: -5 }}
                className={`glass-effect rounded-2xl overflow-hidden group ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col md:flex`}
              >
                {/* Project Image */}
                <div className="md:w-1/2 relative overflow-hidden">
                  <motion.div
                    className="aspect-video bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-6xl text-primary-400 opacity-50">
                        🚀
                      </div>
                    )}
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <motion.button
                      onClick={() => openProjectModal(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </motion.button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-200">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 leading-relaxed mb-6">
                      {project.short_description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getTechColor(
                            tech
                          )}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    {project.url && (
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        <span>
                          {project.url.includes("github.com")
                            ? "Source Code"
                            : "Live Demo"}
                        </span>
                      </motion.a>
                    )}

                    <motion.button
                      onClick={() => openProjectModal(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 glass-effect text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      <Eye size={16} />
                      <span>Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Project Modal with Image Carousel */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeProjectModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-effect rounded-2xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold gradient-text">
                {selectedProject.name}
              </h3>
              <motion.button
                onClick={closeProjectModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Image Carousel Section */}
            {selectedProject.images && selectedProject.images.length > 0 && (
              <div className="mb-8">
                <div className="relative">
                  {/* Main Image Display */}
                  <motion.div
                    className="aspect-video bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl overflow-hidden"
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.name} - Image ${
                        currentImageIndex + 1
                      }`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Navigation Arrows - Only show if more than 1 image */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>

                      <motion.button
                        onClick={nextImage}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation - Only show if more than 1 image */}
                {selectedProject.images.length > 1 && (
                  <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                    {selectedProject.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? "border-primary-400 ring-2 ring-primary-400/50"
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Content */}
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getTechColor(
                        tech
                      )}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex space-x-4">
                {selectedProject.url && (
                  <motion.a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    <span>Visit Website</span>
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
