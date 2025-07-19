import { motion } from 'framer-motion';

const QuickActions = ({ onQuickAction }) => {
  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your projects",
    "What's your experience?",
    "How can I contact you?"
  ];
  
  return (
    <div className="p-3 sm:p-4 border-t border-white/10">
      <p className="text-white/70 text-xs mb-2">Quick questions:</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {quickQuestions.map((question, index) => (
          <motion.button
            key={index}
            onClick={() => onQuickAction(question)}
            className="
              text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 sm:px-3 sm:py-1 
              rounded-full border border-white/20 transition-colors touch-manipulation
              active:bg-white/30 select-none
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;