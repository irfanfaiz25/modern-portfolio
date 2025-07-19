import { motion } from "framer-motion";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import Experience from "./components/Sections/Experience";
import Skills from "./components/Sections/Skills";
import Projects from "./components/Sections/Projects";
import Education from "./components/Sections/Education";
import Contact from "./components/Sections/Contact";
import Highlight from "./components/Sections/Highlight";

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* Background Elements */}
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
      <div className="relative z-10">
        <Header />

        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Highlight />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
