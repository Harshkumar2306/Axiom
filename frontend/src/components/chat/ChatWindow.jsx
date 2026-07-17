import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import PromptInput from './PromptInput';
import { Bot } from 'lucide-react';

export default function ChatWindow({ messages, input, setInput, handleSend, isLoading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages-list">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        
        {isLoading && (
          <div className="message-wrapper bot animate-fade-in">
            <div className="message-header">
              <Bot size={14} className="text-gradient" />
              <span className="text-gradient font-medium">Axiom Model</span>
            </div>
            <div className="message-bubble glass-panel">
              <div className="loading-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <PromptInput 
        input={input} 
        setInput={setInput} 
        handleSend={handleSend} 
        isLoading={isLoading} 
      />
    </div>
  );
}
