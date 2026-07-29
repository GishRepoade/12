import React, { useState } from 'react';
import { UserRole, AnalysisResult } from './types';
import { CaseAnalyzer } from './components/CaseAnalyzer';

export default function App() {
  const [role, setRole] = useState<UserRole>('Advocate');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleClear = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-[#070812] text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Main Content Area - Only AI Analyzer */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex items-center justify-center">
        <CaseAnalyzer
          role={role}
          setRole={setRole}
          onAnalysisComplete={handleAnalysisComplete}
          currentResult={analysisResult}
          onClear={handleClear}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#090a14] border-t border-[#16182c] py-3 text-slate-500 text-[11px] font-mono">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold">QUANT LEGAL AI</span>
            <span>•</span>
            <span>База законів (zakonodavcha_baza.txt)</span>
          </div>
          <div className="text-slate-500">
            Штату Quant RP
          </div>
        </div>
      </footer>

    </div>
  );
}

