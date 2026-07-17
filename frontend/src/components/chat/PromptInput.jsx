import { Send } from 'lucide-react';

export default function PromptInput({ input, setInput, handleSend, isLoading }) {
  return (
    <div className="input-container">
      <form onSubmit={handleSend} className="input-form">
        <input
          type="text"
          className="input-field brand-font"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a Shakespearean prompt... (e.g. 'ROMEO:')"
          disabled={isLoading}
          autoComplete="off"
        />
        <button type="submit" className="send-button" disabled={!input.trim() || isLoading}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
