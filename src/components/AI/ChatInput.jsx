import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatInput = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");

      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 sm:p-4 border-t border-primary-500/20"
    >
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={disabled}
          autoComplete="off"
          className="
            flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 sm:px-4 sm:py-2 
            text-white placeholder-white/50 focus:outline-none focus:border-primary-500 
            transition-colors text-sm sm:text-base touch-manipulation
          "
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="
            bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
            text-white p-2 sm:p-2.5 rounded-xl transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation
            min-w-[40px] sm:min-w-[44px] flex items-center justify-center
          "
        >
          <Send size={16} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
