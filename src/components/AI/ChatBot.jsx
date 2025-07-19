import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";
import { ExperienceData } from "../../assets/data/experiences";
import { EducationData } from "../../assets/data/education";
import { ProjectsData } from "../../assets/data/projects";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. Ask me anything about my skills, projects, or experience! 👋",
      isAI: true,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create summarized data for AI context
  const createSummaryContext = () => {
    const projectsSummary = ProjectsData.map((project) => ({
      name: project.name,
      short_description: project.short_description,
      techStack: project.techStack.join(", "),
      url: project.url || "Private project",
    }));

    const experiencesSummary = ExperienceData.map((exp) => ({
      company: exp.companyName,
      position: exp.as,
      timeSpan: exp.timeSpan,
      key_tech:
        exp.description
          .join(" ")
          .match(
            /\b(Laravel|React|PHP|MySQL|Golang|PostgreSQL|JavaScript|Bootstrap|Tailwind)\b/gi
          )
          ?.slice(0, 3) || [],
    }));

    return {
      projects: projectsSummary,
      experiences: experiencesSummary,
      education: EducationData,
    };
  };

  const portfolioContext = `
  You are an AI assistant for a portfolio website. Here's information about the portfolio owner:

  Name: Ahmad Irfan Faiz
  
  SKILLS: Full-stack Developer, Backend Development, Web Development, JavaScript, React, PHP, Laravel, SQL, MySQL, PostgreSQL, Bootstrap, TailwindCSS
  
  PROJECTS:
  ${createSummaryContext()
    .projects.map(
      (p) => `- ${p.name}: ${p.short_description} (Tech: ${p.techStack})`
    )
    .join("\n")}
  
  EXPERIENCE:
  ${createSummaryContext()
    .experiences.map((e) => `- ${e.position} at ${e.company} (${e.timeSpan})`)
    .join("\n")}
  
  EDUCATION:
  ${EducationData.map(
    (ed) => `- ${ed.major} at ${ed.institution} (${ed.timeSpan})`
  ).join("\n")}
  
  Instructions:
  - Be friendly, professional, and helpful
  - Answer questions about skills, projects, experience, and background
  - If asked about contact, direct them to the contact section
  - Keep responses concise but informative
  - Use emojis occasionally to make conversations engaging
  - If you don't know something specific, be honest and suggest they contact directly
  `;

  const sendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${portfolioContext}\n\nUser question: ${text}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiText = response.text();

      const aiMessage = {
        id: Date.now() + 1,
        text: aiText,
        isAI: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again or contact me directly! 😅",
        isAI: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle close with proper event handling
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  // Handle backdrop click to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Responsive positioning */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
            repeatType: "loop",
          }}
        >
          <MessageCircle size={20} className="sm:w-6 sm:h-6" />
        </motion.button>
      )}

      {/* Chat Window - Fully responsive */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={handleBackdropClick}
            />

            {/* Chat Modal - Responsive sizing and positioning */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              className="
                fixed z-50 bg-dark-800/90 backdrop-blur-lg border border-primary-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden
                /* Mobile: Full screen with padding */
                bottom-0 left-0 right-0 top-16 mx-4 mb-4 mt-4
                /* Tablet and up: Fixed size bottom-right */
                sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto sm:w-96 sm:h-[500px] sm:mx-0 sm:my-0
                /* Large screens: Slightly bigger */
                lg:w-[420px] lg:h-[550px]
              "
            >
              {/* Header - Always visible with responsive padding */}
              <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 p-3 sm:p-4 border-b border-primary-500/20 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <Bot size={14} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        AI Assistant
                      </h3>
                      <p className="text-white/70 text-xs">Ask me anything!</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 sm:p-2 rounded-lg transition-all duration-200 z-10 touch-manipulation"
                    type="button"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Container - Responsive padding and scrolling */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0 overscroll-contain">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-white/70">
                    <Bot size={14} className="sm:w-4 sm:h-4" />
                    <div className="flex gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions - Always visible */}
              <div className="flex-shrink-0">
                <QuickActions onQuickAction={sendMessage} />
              </div>

              {/* Input - Always visible */}
              <div className="flex-shrink-0">
                <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
