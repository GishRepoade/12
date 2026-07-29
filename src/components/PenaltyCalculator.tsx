import React, { useState } from 'react';
import { QUANT_CRIMINAL_RULES } from '../data/lawsData';
import { CriminalArticleRule } from '../types';
import { Calculator, Award, Clock, DollarSign, ShieldAlert, Check, RefreshCw } from 'lucide-react';

export const PenaltyCalculator: React.FC = () => {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [isConfession, setIsConfession] = useState(false); // Каяття ст. 3.11 КК (-50%)

  const toggleArticle = (artStr: string) => {
    if (selectedArticles.includes(artStr)) {
      setSelectedArticles(selectedArticles.filter((a) => a !== artStr));
    } else {
      setSelectedArticles([...selectedArticles, artStr]);
    }
  };

  const selectedRules = QUANT_CRIMINAL_RULES.filter((r) => selectedArticles.includes(r.article));

  // Calculations according to Criminal Code rules:
  // ст. 1.6 КК: При сукупності злочинів покарання призначається не більше тієї статті, яка передбачає найсуворіше покарання
  const maxPriority = selectedRules.reduce((max, r) => Math.max(max, r.priority), 0);
  const maxJailTime = selectedRules.reduce((max, r) => Math.max(max, r.jailTime), 0);
  const totalFine = selectedRules.reduce((sum, r) => sum + r.fine, 0);
  const hasCriminalRecord = selectedRules.some((r) => r.hasRecord);
  const isBailAllowed = selectedRules.length > 0 && selectedRules.every((r) => r.bailAllowed);

  // Apply confession reduction (ст. 3.11 КК: полегшення міри покарання до її половини)
  const finalJailTime = isConfession ? Math.floor(maxJailTime / 2) : maxJailTime;
  const finalFine = isConfession ? Math.floor(totalFine / 2) : totalFine;

  // Bail estimation according to ст. 3.14 КК
  let bailRange = '—';
  if (isBailAllowed && maxPriority > 0) {
    if (maxPriority === 5) bailRange = '$75,000 - $100,000';
    else if (maxPriority === 4) bailRange = '$50,000 - $75,000';
    else if (maxPriority === 3) bailRange = '$25,000 - $50,000';
    else if (maxPriority === 2) bailRange = '$15,000 - $25,000';
    else if (maxPriority === 1) bailRange = '$5,000 - $15,000';
  }

  // Legal Rehabilitation Cost according to Судовий Кодекс ст. 16.8
  let rehabCost = 0;
  if (hasCriminalRecord) {
    if (maxPriority <= 2) rehabCost = 100000;
    else if (maxPriority === 3) rehabCost = 150000;
    else if (maxPriority >= 4) rehabCost = 250000;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-6 h-6 text-amber-400" />
          <span>Калькулятор Покарань та Застави (КК & СК Quant)</span>
        </h2>
        <p className="text-xs text-slate-400">
          Оберіть статі КК, які інкримінуються підозрюваному. Калькулятор автоматично розрахує пріоритет розшуку, термін ув'язнення за сукупністю злочинів (ст. 1.6 КК), право на заставу (ст. 3.14 КК) та вартість реабілітації (ст. 16 СК).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Article Selector List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase text-slate-300">
              Оберіть статті Кримінального Кодексу:
            </span>
            {selectedArticles.length > 0 && (
              <button
                onClick={() => setSelectedArticles([])}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Скинути вибір</span>
              </button>
            )}
          </div>

          <div className="space-y-2">
            {QUANT_CRIMINAL_RULES.map((rule) => {
              const isSelected = selectedArticles.includes(rule.article);
              return (
                <div
                  key={rule.article}
                  onClick={() => toggleArticle(rule.article)}
                  className={`cursor-pointer border rounded-xl p-3.5 transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-950/30 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400">{rule.article}</span>
                        <span className="text-xs font-semibold text-white">{rule.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Пріоритет: <strong className="text-slate-200">{rule.priority}★</strong> | До{' '}
                        <strong className="text-slate-200">{rule.jailTime} хв</strong> | Штраф:{' '}
                        <strong className="text-slate-200">${rule.fine.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1">
                    {rule.hasRecord ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Судимість
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Без судимості
                      </span>
                    )}

                    {!rule.bailAllowed && (
                      <span className="text-[10px] text-rose-400 font-semibold">Без застави</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confession Option (ст. 3.11 КК) */}
          <div className="pt-4 border-t border-slate-800">
            <label className="flex items-center gap-3 cursor-pointer bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
              <input
                type="checkbox"
                checked={isConfession}
                onChange={(e) => setIsConfession(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
              />
              <div>
                <span className="text-xs font-bold text-slate-200 block">
                  Застосувати ст. 3.11 КК (Діяльне каяття та визнання вини)
                </span>
                <span className="text-[11px] text-slate-400">
                  Знижує підсумковий термін ув'язнення та суму штрафу на 50%
                </span>
              </div>
            </label>
          </div>

        </div>

        {/* Total Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 h-fit sticky top-20">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Підсумковий розрахунок</span>
          </h3>

          {selectedArticles.length === 0 ? (
            <div className="text-center text-slate-500 text-xs py-8">
              Оберіть одну або декілька статей КК зі списку ліворуч, щоб розрахувати покарання.
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Priority */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Пріоритет розшуку</span>
                  <span className="text-[10px] text-slate-500">За найсуворішою статтею (ст. 1.6 КК)</span>
                </div>
                <span className="text-2xl font-black text-amber-400">{maxPriority} ★</span>
              </div>

              {/* Jail Time */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Термін ув'язнення (КПЗ)</span>
                  {isConfession && <span className="text-[10px] text-emerald-400">Застосовано ст. 3.11 (-50%)</span>}
                </div>
                <span className="text-2xl font-black text-sky-400 flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  {finalJailTime} хв
                </span>
              </div>

              {/* Total Fine */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Сумарний штраф</span>
                  {isConfession && <span className="text-[10px] text-emerald-400">Застосовано ст. 3.11 (-50%)</span>}
                </div>
                <span className="text-xl font-bold text-emerald-400 flex items-center">
                  <DollarSign className="w-4 h-4" />
                  {finalFine.toLocaleString()}
                </span>
              </div>

              {/* Criminal Record */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Судимість:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${hasCriminalRecord ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                  {hasCriminalRecord ? 'ТАК (Заборона держслужби)' : 'НІ'}
                </span>
              </div>

              {/* Bail Status */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Право на заставу (ст. 3.14):</span>
                  <span className={`text-xs font-bold ${isBailAllowed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isBailAllowed ? 'Є ПРАВО' : 'НЕМАЄ ПРАВА'}
                  </span>
                </div>
                {isBailAllowed && (
                  <div className="text-xs text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                    <span>Сума застави:</span>
                    <strong className="text-amber-300">{bailRange}</strong>
                  </div>
                )}
              </div>

              {/* Legal Rehab Cost */}
              {hasCriminalRecord && (
                <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Юридична реабілітація (ст. 16 СК)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Орієнтовна вартість зняття судимості через Верховного суддю: <strong className="text-amber-400">${rehabCost.toLocaleString()}</strong>
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
