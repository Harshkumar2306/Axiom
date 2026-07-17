import { Bot, User } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-wrapper animate-fade-in ${isUser ? 'user' : 'bot'}`}>
      <div className="message-header">
        {isUser ? (
          <>
            <span>You</span>
            <User size={14} />
          </>
        ) : (
          <>
            <Bot size={14} className="text-gradient" />
            <span className="text-gradient font-medium">Axiom Model</span>
          </>
        )}
      </div>
      <div className="message-bubble glass-panel">
        {message.content}
      </div>
    </div>
  );
}
