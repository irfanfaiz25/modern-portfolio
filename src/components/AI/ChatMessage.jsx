import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

// Component untuk memformat teks markdown
const FormattedText = ({ text }) => {
  // Fungsi untuk memparse dan memformat teks
  const formatText = (text) => {
    // Split teks berdasarkan baris
    const lines = text.split("\n");
    const formattedElements = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Skip baris kosong
      if (!trimmedLine) {
        formattedElements.push(<br key={`br-${index}`} />);
        return;
      }

      // Handle bullet points dengan * atau -
      if (trimmedLine.match(/^[\*\-]\s+\*\*(.*?)\*\*(.*)/)) {
        const match = trimmedLine.match(/^[\*\-]\s+\*\*(.*?)\*\*(.*)/);
        formattedElements.push(
          <div key={index} className="flex items-start gap-2 mb-2">
            <span className="text-blue-400 mt-1">•</span>
            <div>
              <span className="font-semibold text-blue-300">{match[1]}</span>
              <span>{match[2]}</span>
            </div>
          </div>
        );
      }
      // Handle bullet points biasa
      else if (trimmedLine.match(/^[\*\-]\s+(.*)/)) {
        const match = trimmedLine.match(/^[\*\-]\s+(.*)/);
        formattedElements.push(
          <div key={index} className="flex items-start gap-2 mb-1">
            <span className="text-blue-400 mt-1">•</span>
            <span>{formatInlineText(match[1])}</span>
          </div>
        );
      }
      // Handle teks bold **text**
      else if (trimmedLine.includes("**")) {
        formattedElements.push(
          <p key={index} className="mb-2">
            {formatInlineText(trimmedLine)}
          </p>
        );
      }
      // Handle teks biasa
      else {
        formattedElements.push(
          <p key={index} className="mb-2">
            {trimmedLine}
          </p>
        );
      }
    });

    return formattedElements;
  };

  // Fungsi untuk memformat teks inline (bold, dll)
  const formatInlineText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} className="font-semibold text-blue-300">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return <div className="space-y-1">{formatText(text)}</div>;
};

const ChatMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${message.isAI ? "justify-start" : "justify-end"}`}
    >
      {message.isAI && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          message.isAI
            ? "bg-white/10 text-white border border-white/20"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        }`}
      >
        <div className="text-sm leading-relaxed">
          {message.isAI ? (
            <FormattedText text={message.text} />
          ) : (
            <p>{message.text}</p>
          )}
        </div>
        <p className="text-xs opacity-70 mt-2">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
