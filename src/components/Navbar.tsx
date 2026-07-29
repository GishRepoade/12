import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: 'analyzer' | 'database' | 'calculator' | 'checklist' | 'documents';
  setActiveTab: (tab: 'analyzer' | 'database' | 'calculator' | 'checklist' | 'documents') => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, role, setRole }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur border-b border-[#1f242d] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('database')}
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xs">
              Q
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white font-mono">
                QUANT PROTOCOL
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] font-mono font-medium rounded bg-[#181c24] text-slate-400 border border-slate-700">
                v1.3.1
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#12151b] p-1 rounded-xl border border-[#1f242d]">
            <button
              onClick={() => setActiveTab('database')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'database'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#191d26]'
              }`}
            >
              Законодавча база
            </button>

            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#191d26]'
              }`}
            >
              ШІ-Аналізатор
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#191d26]'
              }`}
            >
              Калькулятор застави
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#191d26]'
              }`}
            >
              Чек-листи
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'documents'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-[#191d26]'
              }`}
            >
              Документи
            </button>
          </nav>

          {/* Quick Role Toggle */}
          <div className="flex items-center gap-1 bg-[#12151b] border border-[#1f242d] p-1 rounded-xl">
            <button
              onClick={() => setRole('Advocate')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                role === 'Advocate'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Адвокат
            </button>
            <button
              onClick={() => setRole('Prosecutor')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                role === 'Prosecutor'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Прокурор
            </button>
            <button
              onClick={() => setRole('Officer')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                role === 'Officer'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Офіцер
            </button>
          </div>

        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-[#1f242d] text-xs gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('database')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'database' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Закони
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'analyzer' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Аналізатор
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'calculator' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Калькулятор
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'checklist' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Чек-листи
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'documents' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Документи
          </button>
        </div>

      </div>
    </header>
  );
};
