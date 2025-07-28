import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  Eye,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Code,
  Zap,
} from "lucide-react";
import { ProjectsData } from "../../assets/data/projects";

// Tambahkan lazy loading untuk gambar
const LazyImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="w-full h-full relative overflow-hidden">
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...props}
        />
      )}
      {!isInView && (
        <div className="w-full h-full bg-gradient-to-br from-primary-500/10 to-primary-600/10 animate-pulse" />
      )}
    </div>
  );
};

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
    setCurrentImageIndex(0);
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
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
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-primary-500/8 to-accent-500/6 rounded-full blur-3xl top-10 right-10" />
        <div className="absolute w-80 h-80 bg-gradient-to-br from-accent-500/6 to-primary-500/4 rounded-full blur-3xl bottom-20 left-15" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 glass-effect px-6 py-3 rounded-full text-sm font-medium text-primary-400 mb-6">
              <Filter size={16} />
              <span>Featured Work</span>
            </div>

            <motion.h2
              className="text-5xl md:text-7xl font-black leading-tight mb-6"
              variants={itemVariants}
            >
              <span className="text-white">My</span>{" "}
              <span className="gradient-text text-glow">Projects</span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Discover my latest work showcasing innovative solutions, clean
              code, and modern web technologies. Each project represents a
              unique challenge and creative solution.
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-200 overflow-hidden ${
                  filter === filterOption
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20"
                    : "glass-effect text-gray-300 hover:text-primary-400 hover:bg-primary-500/10"
                }`}
              >
                {filter === filterOption && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filterOption}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5 }}
                  className={`glass-effect rounded-2xl overflow-hidden group cursor-pointer ${
                    index % 3 === 0 ? "md:row-span-2" : ""
                  }`}
                  onClick={() => openProjectModal(project)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <div
                      className={`${
                        index % 3 === 0 ? "aspect-[4/5]" : "aspect-video"
                      } bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center relative`}
                    >
                      {project.images && project.images.length > 0 ? (
                        <LazyImage
                          src={project.images[0]}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-6xl text-primary-400 opacity-50">
                          🚀
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-600/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex space-x-3">
                        <button
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project);
                          }}
                        >
                          <Eye size={20} />
                        </button>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Number Badge */}
                    <div className="absolute top-4 left-4 bg-primary-600/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-200">
                      {project.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.short_description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getTechColor(
                            tech
                          )}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Project Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-xs text-gray-400">
                          Live Project
                        </span>
                      </div>
                      <div className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Play size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-effect rounded-2xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 z-10 hover:rotate-90 transition-transform"
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className="mb-8">
                <h3 className="text-4xl font-bold gradient-text mb-4">
                  {selectedProject.name}
                </h3>
                <p className="text-gray-300 text-lg">
                  {selectedProject.short_description}
                </p>
              </div>

              {/* Image Carousel */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mb-8">
                  <div className="relative">
                    {/* Main Image */}
                    <div className="aspect-video bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl overflow-hidden">
                      <LazyImage
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.name} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? "border-primary-400 ring-2 ring-primary-400/50 shadow-lg"
                              : "border-gray-600 hover:border-gray-400"
                          }`}
                        >
                          <LazyImage
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Modal Content */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                      <Code className="mr-2 text-primary-400" size={20} />
                      Project Description
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    {selectedProject.url && (
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg"
                      >
                        <ExternalLink size={18} />
                        <span>Visit Live Site</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Zap className="mr-2 text-accent-400" size={20} />
                      Technologies Used
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.techStack.map((tech, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border text-center ${getTechColor(
                            tech
                          )}`}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
