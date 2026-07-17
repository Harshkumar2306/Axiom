import { Sparkles, Activity, Cpu, Database } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <h1 className="sidebar-title brand-font">
          <Sparkles className="text-gradient" size={28} />
          <span>Axiom</span>
        </h1>
      </div>
      
      <div className="sidebar-content">
        <div className="stat-card">
          <div className="stat-label flex items-center gap-2">
            <Cpu size={14} /> Architecture
          </div>
          <div className="stat-value">SwiGLU GPT</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label flex items-center gap-2">
            <Database size={14} /> Parameters
          </div>
          <div className="stat-value text-gradient">17.86 Million</div>
        </div>

        <div className="stat-card">
          <div className="stat-label flex items-center gap-2">
            <Activity size={14} /> Context Window
          </div>
          <div className="stat-value">1,024 Tokens</div>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-[var(--border-glass)] text-xs text-[var(--text-muted)]">
        Axiom LLM Interface v1.0
      </div>
    </aside>
  );
}
