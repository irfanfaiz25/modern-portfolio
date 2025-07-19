import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${message.isAI ? 'justify-start' : 'justify-end'}`}
    >
      {message.isAI && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-white" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          message.isAI
            ? 'bg-white/10 text-white border border-white/20'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {!message.isAI && (
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;