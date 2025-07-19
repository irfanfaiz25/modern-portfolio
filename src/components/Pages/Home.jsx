import { motion } from "framer-motion";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Hero from "../Sections/Hero";
import About from "../Sections/About";
import Experience from "../Sections/Experience";
import Skills from "../Sections/Skills";
import Projects from "../Sections/Projects";
import Education from "../Sections/Education";
import Contact from "../Sections/Contact";
import Highlight from "../Sections/Highlight";
import ChatBot from "../AI/ChatBot";

const Home = () => {
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
      <ChatBot />
    </div>
  );
};

export default Home;
