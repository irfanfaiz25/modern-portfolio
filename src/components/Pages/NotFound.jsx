import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden relative">
      {/* Background Elements - Same as main portfolio */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl top-20 -left-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-primary-600/5 rounded-full blur-3xl bottom-20 -right-20"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Number with Floating Animation */}
          <motion.div
            className="relative mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent leading-none"
              variants={floatingVariants}
              animate="animate"
            >
              404
            </motion.div>
            
            {/* Floating Icons */}
            <motion.div
              className="absolute -top-4 -left-4 text-primary-400/60"
              animate={{
                y: [-5, 5, -5],
                x: [-2, 2, -2],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Search size={32} />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -right-8 text-primary-500/40"
              animate={{
                y: [5, -5, 5],
                x: [2, -2, 2],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <AlertTriangle size={28} />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Oops! Page Not Found
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-2">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
            <p className="text-base text-white/60">
              Don't worry, even the best developers get lost sometimes! 🚀
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <motion.button
                className="group flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-primary-500/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </motion.button>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-primary-400 mb-2">💡 Fun Fact</h3>
            <p className="text-white/70 text-sm">
              The HTTP 404 error was named after room 404 at CERN, where the original web servers were located. 
              When a file couldn't be found, it was said to be "404" - not found in room 404!
            </p>
          </motion.div>

          {/* Animated Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;