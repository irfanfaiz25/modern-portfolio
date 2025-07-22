import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  FolderOpen,
  GraduationCap,
  Mail,
} from "lucide-react";

// Constants
const SCROLL_THRESHOLD = 50;
const SECTION_OFFSET = 100;

// Navigation configuration
const NAV_ITEMS = [
  { name: "Home", href: "#hero", icon: Home, id: "hero" },
  { name: "About", href: "#about", icon: User, id: "about" },
  {
    name: "Experience",
    href: "#experience",
    icon: Briefcase,
    id: "experience",
  },
  { name: "Skills", href: "#skills", icon: Code, id: "skills" },
  { name: "Projects", href: "#projects", icon: FolderOpen, id: "projects" },
  {
    name: "Education",
    href: "#education",
    icon: GraduationCap,
    id: "education",
  },
  { name: "Contact", href: "#contact", icon: Mail, id: "contact" },
];

// Animation variants
const navigationVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (index) => ({
    x: 0,
    opacity: 1,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const mobileMenuVariants = {
  hidden: { x: -280, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
  exit: { x: -280, opacity: 0 },
};

// Subcomponents
const NavigationItem = ({ item, index, isActive, isMobile = false }) => {
  const IconComponent = item.icon;

  const baseClasses = `flex items-center transition-all duration-300 group relative`;
  const desktopClasses = `w-14 h-14 rounded-xl justify-center ${
    isActive
      ? "bg-orange-500/40 border border-orange-500/60 shadow-lg shadow-orange-500/25"
      : "bg-white/10 hover:bg-orange-500/25 border border-transparent hover:border-orange-500/30"
  }`;
  const mobileClasses = `space-x-4 p-3 rounded-xl ${
    isActive
      ? "bg-orange-500/30 border border-orange-500/50 text-orange-500"
      : "text-white/80 hover:text-orange-500 hover:bg-orange-500/20"
  }`;

  const iconClasses = `transition-colors duration-300 ${
    isActive ? "text-orange-400" : "text-white/80 group-hover:text-orange-400"
  }`;

  return (
    <motion.div
      className="relative group"
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.a
        href={item.href}
        className={`${baseClasses} ${
          isMobile ? mobileClasses : desktopClasses
        }`}
        onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
        whileHover={isMobile ? { x: 5 } : { scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobile && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-orange-500/20"
                : "bg-white/5 group-hover:bg-orange-500/20"
            }`}
          >
            <IconComponent className={`w-5 h-5 ${iconClasses}`} />
          </div>
        )}
        {!isMobile && <IconComponent className={`w-6 h-6 ${iconClasses}`} />}
        {isMobile && <span className="text-base font-medium">{item.name}</span>}
      </motion.a>

      {/* Desktop Tooltip */}
      {!isMobile && <Tooltip text={item.name} />}

      {/* Active Indicator */}
      {!isMobile && isActive && <ActiveIndicator />}
    </motion.div>
  );
};

const Tooltip = ({ text }) => (
  <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg border border-orange-500/20 z-50">
    {text}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 rotate-45 border-l border-b border-orange-500/20" />
  </div>
);

const ActiveIndicator = () => (
  <motion.div
    className="absolute -right-2 top-2 transform w-1 h-10 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50"
    initial={{ opacity: 0, scale: 0, x: -5 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  />
);

const MobileMenuButton = ({ isMenuOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    className="lg:hidden fixed top-6 left-6 z-50 w-12 h-12 bg-black/20 backdrop-blur-md border border-orange-500/20 rounded-xl flex items-center justify-center glass-effect-alt"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
  >
    {isMenuOpen ? (
      <X className="w-6 h-6 text-orange-500" />
    ) : (
      <Menu className="w-6 h-6 text-white" />
    )}
  </motion.button>
);

const DesktopNavigation = ({ activeSection }) => (
  <motion.nav
    className="hidden lg:flex fixed left-6 top-[1.5rem] transform -translate-y-[13rem] w-20 bg-black/30 backdrop-blur-xl border border-orange-500/20 rounded-2xl z-50 shadow-2xl shadow-black/20"
    variants={navigationVariants}
    initial="hidden"
    animate="visible"
    style={{
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
    }}
  >
    <div className="flex flex-col items-center justify-center w-full py-6">
      <div className="flex flex-col space-y-4">
        {NAV_ITEMS.map((item, index) => (
          <NavigationItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeSection === item.id}
          />
        ))}
      </div>
    </div>
  </motion.nav>
);

const MobileNavigation = ({ activeSection, onClose }) => (
  <motion.nav
    className="lg:hidden fixed top-20 transform w-full bg-black/30 backdrop-blur-md border border-orange-500/20 rounded-2xl z-50 glass-effect-alt"
    variants={mobileMenuVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="flex flex-col p-6">
      <div className="space-y-4">
        {NAV_ITEMS.map((item, index) => (
          <NavigationItem
            key={item.id}
            item={item}
            index={index}
            isActive={activeSection === item.id}
            isMobile
          />
        ))}
      </div>
    </div>
  </motion.nav>
);

// Custom hooks
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > SCROLL_THRESHOLD);

    // Detect active section
    const sections = NAV_ITEMS.map((item) => item.id);
    const scrollPosition = currentScrollY + SECTION_OFFSET;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { activeSection, scrolled };
};

// Main Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection } = useActiveSection();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoize backdrop to prevent unnecessary re-renders
  const backdrop = useMemo(
    () => (
      <motion.div
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeMenu}
      />
    ),
    [closeMenu]
  );

  return (
    <>
      <DesktopNavigation activeSection={activeSection} />

      <MobileMenuButton isMenuOpen={isMenuOpen} onClick={toggleMenu} />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {backdrop}
            <MobileNavigation
              activeSection={activeSection}
              onClose={closeMenu}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
