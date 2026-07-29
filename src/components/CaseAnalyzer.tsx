import React, { useState } from 'react';
import { UserRole, AnalysisResult } from '../types';
import { Sparkles, Trash2, Send, Scale, ShieldAlert, ShieldCheck, AlertTriangle, BookOpen, Settings } from 'lucide-react';
import { AnalysisResultView } from './AnalysisResultView';

interface CaseAnalyzerProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
  currentResult: AnalysisResult | null;
  onClear: () => void;
  onOpenDatabase?: () => void;
}

const PRESET_PROMPTS = [
  {
    icon: '🔍',
    title: 'Затримання без ордеру',
    text: 'Співробітник FIB затримав держслужбовця за статтею 10.12 КК без присутності прокурора та керівництва. Процесуальний кодекс порушено.'
  },
  {
    icon: '🏎️',
    title: 'Перевищення швидкості',
    text: 'Водій на авто не зупинився на 1 вимога в мегафон. Офіцер одразу відкрив вогонь по колах та затримав за 10.12 КК. Проаналізуй ДК та ПК.'
  },
  {
    icon: '📖',
    title: 'Що таке стаття 13.6?',
    text: 'Громадянин носив формений одяг FIB та мав при собі держтезер. Проаналізуй відповідальність за ст. 13.6 КК, термін КПЗ та чи є застава.'
  },
  {
    icon: '📜',
    title: 'Незаконне звільнення',
    text: 'Шериф звільнив заступника за Трудовим кодексом без рішення суду чи переатестації під час відпустки.'
  }
];

export const CaseAnalyzer: React.FC<CaseAnalyzerProps> = ({
  role,
  setRole,
  onAnalysisComplete,
  currentResult,
  onClear,
  onOpenDatabase
}) => {
  const [incidentText, setIncidentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || incidentText;
    if (!prompt.trim()) {
      setError('Будь ласка, введіть ситуацію або оберіть шаблон.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          incidentText: prompt.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Помилка HTTP ${response.status}`);
      }

      const result: AnalysisResult = await response.json();
      onAnalysisComplete(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Виникла помилка під час юридичного аналізу.');
    } finally {
      setLoading(false);
    }
  };

  const handleChipClick = (presetText: string) => {
    setIncidentText(presetText);
    handleSend(presetText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[600px] bg-[#0c0d18] border border-[#1a1c30] rounded-3xl shadow-2xl overflow-hidden relative">
      
      {/* Sleek Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e1020]/90 border-b border-[#1b1e36] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0d18] rounded-[14px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-white text-base tracking-wide">Legal AI</h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Готовий до роботи • Quant RP</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDatabase && (
            <button
              onClick={onOpenDatabase}
              className="px-3 py-1.5 rounded-xl bg-[#14162a] hover:bg-[#1d203c] border border-[#252848] text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">База законів</span>
            </button>
          )}

          <button
            onClick={() => {
              setIncidentText('');
              onClear();
              setError(null);
            }}
            title="Очистити чат"
            className="p-2 rounded-xl bg-[#14162a] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-[#252848] transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role Selection Bar */}
      <div className="bg-[#0e1020] border-b border-[#1b1e36] px-6 py-2.5 flex items-center justify-center">
        <div className="inline-flex p-1 bg-[#121428] border border-[#232644] rounded-2xl gap-1">
          <button
            onClick={() => setRole('Advocate')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              role === 'Advocate'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>⚖️</span>
            <span>Адвокат</span>
          </button>

          <button
            onClick={() => setRole('Prosecutor')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              role === 'Prosecutor'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🏛️</span>
            <span>Прокурор</span>
          </button>

          <button
            onClick={() => setRole('Officer')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              role === 'Officer'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>👮</span>
            <span>Офіцер</span>
          </button>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-y-auto">
        {!currentResult && !loading ? (
          <div className="w-full max-w-xl text-center space-y-6 my-auto animate-fadeIn">
            {/* Centered Glowing Logo */}
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-600/10 border border-indigo-500/30 flex items-center justify-center shadow-2xl shadow-indigo-500/20 relative">
              <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-pulse"></div>
              <Scale className="w-10 h-10 text-indigo-400 relative z-10" />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">Юридичний ШІ-Помічник</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed whitespace-pre-line">
                Оберіть роль та опишіть ситуацію.{'\n'}Я проаналізую її згідно законодавчої бази штату Quant.
              </p>
            </div>

            {/* 4 Preset Action Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {PRESET_PROMPTS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(preset.text)}
                  className="p-3.5 rounded-2xl bg-[#111326] border border-[#202342] hover:border-indigo-500/50 hover:bg-[#161933] text-left transition-all duration-200 group flex items-start gap-3 shadow-md"
                >
                  <span className="text-xl p-1 bg-[#181a35] rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                    {preset.icon}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {preset.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {preset.text}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className="my-auto text-center space-y-4 py-12">
            <div className="mx-auto w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Аналізуємо ситуацію за КК, ПК, ДК, СК...</p>
              <p className="text-xs text-slate-400">Перевірка складу злочину та аргументації для {role === 'Advocate' ? 'Адвоката' : role === 'Prosecutor' ? 'Прокурора' : 'Офіцера'}</p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {currentResult && <AnalysisResultView result={currentResult} />}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-6 mb-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Bottom Floating Input Bar */}
      <div className="p-4 bg-[#0e1020]/90 border-t border-[#1b1e36] backdrop-blur-md">
        <div className="relative flex items-center">
          <textarea
            rows={2}
            value={incidentText}
            onChange={(e) => setIncidentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Опишіть ситуацію..."
            className="w-full bg-[#111326] border border-[#222548] rounded-2xl py-3 pl-4 pr-14 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/40 resize-none transition-all"
          />

          <button
            onClick={() => handleSend()}
            disabled={loading || !incidentText.trim()}
            className={`absolute right-2.5 p-3 rounded-xl transition-all ${
              loading || !incidentText.trim()
                ? 'bg-[#1a1d38] text-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 active:scale-95'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Footer info line matching screenshot */}
        <div className="text-center mt-3 text-[11px] text-slate-500">
          <span>📚 База: zakonodavcha_baza.txt • Працює на Gemini / Quant RP API</span>
        </div>
      </div>

    </div>
  );
};
