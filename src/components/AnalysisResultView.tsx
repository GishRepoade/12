import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { ShieldCheck, Scale, ShieldAlert, BookOpen, AlertTriangle, FileText, Copy, Check, DollarSign, Clock, Award } from 'lucide-react';

interface AnalysisResultViewProps {
  result: AnalysisResult;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ result }) => {
  const [copiedDocIndex, setCopiedDocIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedDocIndex(index);
    setTimeout(() => setCopiedDocIndex(null), 2000);
  };

  const getRoleHeader = () => {
    if (result.role === 'Advocate') {
      return {
        title: 'Захисна лінія та аргументація (Адвокат)',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
      };
    }
    if (result.role === 'Prosecutor') {
      return {
        title: 'Обвинувачення та вирок (Прокурор)',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        icon: <Scale className="w-5 h-5 text-amber-400" />
      };
    }
    return {
      title: 'Правомірність дій та рапорт (Офіцер / Агент)',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: <ShieldAlert className="w-5 h-5 text-blue-400" />
    };
  };

  const roleMeta = getRoleHeader();

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Title & Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {roleMeta.icon}
            <h2 className="text-xl font-bold text-white">{result.caseTitle || 'Аналіз Юридичної Ситуації'}</h2>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${roleMeta.badge}`}>
            Роль: {result.role === 'Advocate' ? 'Адвокат' : result.role === 'Prosecutor' ? 'Прокурор' : 'Офіцер'}
          </span>
        </div>
        <p className="text-sm text-slate-300 bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* 1. Elements of Offense (Склад правопорушення) */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Елементи складу правопорушення</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Object */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-amber-400">1. Об'єкт</span>
              <span className="text-[10px] text-slate-500">На що посягнули</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{result.elements.object}</p>
          </div>

          {/* Objective Side */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-sky-400">2. Об'єктивна сторона</span>
              <span className="text-[10px] text-slate-500">Діяння, наслідки, обставини</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{result.elements.objectiveSide}</p>
          </div>

          {/* Subject */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-emerald-400">3. Суб'єкт</span>
              <span className="text-[10px] text-slate-500">Особа, вік, статус</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{result.elements.subject}</p>
          </div>

          {/* Subjective Side */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-purple-400">4. Суб'єктивна сторона</span>
              <span className="text-[10px] text-slate-500">Форма вини & мотив</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{result.elements.subjectiveSide}</p>
          </div>

        </div>
      </div>

      {/* 2. Role Tactics & Argumentation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          {roleMeta.icon}
          <span>{roleMeta.title}</span>
        </h3>

        {/* Main Strategy */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Головна юридична лінія:
          </span>
          <p className="text-xs text-slate-200 leading-relaxed">
            {result.roleArgumentation.mainStrategy}
          </p>
        </div>

        {/* Key Arguments */}
        {result.roleArgumentation.keyArguments?.length > 0 && (
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Ключові аргументи з посиланням на кодекси:
            </span>
            <ul className="space-y-2">
              {result.roleArgumentation.keyArguments.map((arg, idx) => (
                <li key={idx} className="bg-slate-950/50 border border-slate-800/60 p-3 rounded-lg text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{idx + 1}.</span>
                  <span>{arg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Counter Arguments */}
        {result.roleArgumentation.potentialCounterArguments?.length > 0 && (
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">
              Можливі контраргументи протилежної сторони та як їх відбити:
            </span>
            <ul className="space-y-2">
              {result.roleArgumentation.potentialCounterArguments.map((carg, idx) => (
                <li key={idx} className="bg-rose-950/20 border border-rose-900/30 p-3 rounded-lg text-xs text-rose-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{carg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Procedural Steps */}
        {result.roleArgumentation.proceduralNextSteps?.length > 0 && (
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-2">
              Рекомендовані подальші процесуальні кроки:
            </span>
            <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-300 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800">
              {result.roleArgumentation.proceduralNextSteps.map((step, idx) => (
                <li key={idx} className="py-0.5">{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* 3. Applied Articles */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Нормативно-правова база (Застосовані статті закону)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.citedArticles?.map((art, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">{art.lawName}</span>
                <span className="px-2 py-0.5 text-[11px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {art.articleNumber}
                </span>
              </div>
              <div className="text-xs font-semibold text-white">{art.title}</div>
              {art.quote && (
                <p className="text-[11px] italic text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/60">
                  "{art.quote}"
                </p>
              )}
              <div className="text-xs text-slate-300 pt-1 border-t border-slate-800/50">
                <span className="text-slate-500 font-medium">Застосування: </span>
                <span>{art.relevance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Procedural Violations if present */}
      {result.proceduralViolations && result.proceduralViolations.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-5 shadow-xl">
          <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Виявлені процесуальні порушення / Помилки затримання</span>
          </h4>
          <ul className="space-y-1.5">
            {result.proceduralViolations.map((v, idx) => (
              <li key={idx} className="text-xs text-rose-200 flex items-start gap-2 bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/30">
                <span className="text-rose-400 font-bold">•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 5. Penalty Assessment */}
      {result.penaltyAssessment && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Оцінка покарання за Quant RP</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Пріоритет</span>
              <span className="text-lg font-bold text-amber-400">
                {result.penaltyAssessment.wantedPriority ? `${result.penaltyAssessment.wantedPriority} ★` : '—'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Термін КПЗ</span>
              <span className="text-lg font-bold text-sky-400 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                {result.penaltyAssessment.jailTimeMonths ? `${result.penaltyAssessment.jailTimeMonths} хв` : '—'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Штраф</span>
              <span className="text-lg font-bold text-emerald-400 flex items-center justify-center gap-0.5">
                <DollarSign className="w-4 h-4" />
                {result.penaltyAssessment.fineAmount ? result.penaltyAssessment.fineAmount.toLocaleString() : '—'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Судимість</span>
              <span className={`text-xs font-bold ${result.penaltyAssessment.hasCriminalRecord ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result.penaltyAssessment.hasCriminalRecord ? 'ТАК (Заборона працевлаштування)' : 'НІ'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Застава</span>
              <span className={`text-xs font-bold ${result.penaltyAssessment.isBailAllowed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.penaltyAssessment.isBailAllowed ? 'ДОЗВОЛЕНО' : 'ЗАБОРОНЕНО'}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase block mb-1">Сума застави</span>
              <span className="text-xs font-semibold text-slate-200">
                {result.penaltyAssessment.bailAmountRange || '—'}
              </span>
            </div>

          </div>
        </div>
      )}

      {/* 6. Document Templates */}
      {result.recommendedDocuments?.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>Сформовані Процесуальні Документи для справи</span>
          </h3>

          <div className="space-y-4">
            {result.recommendedDocuments.map((doc, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 block">{doc.title}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{doc.type}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(doc.templateText, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition-all"
                  >
                    {copiedDocIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Скопійовано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Скопіювати шаблон</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap bg-slate-900 p-3 rounded-lg border border-slate-800/80 leading-relaxed overflow-x-auto">
                  {doc.templateText}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
