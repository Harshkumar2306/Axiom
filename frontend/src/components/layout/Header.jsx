import { Github, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="header glass-panel">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium tracking-wide text-[var(--text-secondary)] brand-font">
          Interactive Evaluation
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[var(--text-secondary)] hover:text-white">
          <Settings size={20} />
        </button>
        <a 
          href="https://github.com/Harshkumar2306/Axiom" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors text-[var(--text-secondary)] hover:text-white"
        >
          <Github size={20} />
        </a>
      </div>
    </header>
  );
}
