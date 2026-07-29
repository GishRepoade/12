import React from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, setRole }) => {
  const roles: {
    id: UserRole;
    title: string;
    badgeColor: string;
    borderColor: string;
    description: string;
  }[] = [
    {
      id: 'Advocate',
      title: 'Адвокат (Захисник)',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      borderColor: currentRole === 'Advocate' ? 'border-emerald-500 bg-[#141a24]' : 'border-[#1f242d] bg-[#12151b] hover:border-slate-700',
      description: 'Стратегія захисту клієнта, пошук процесуальних порушень та заклики до реабілітації.'
    },
    {
      id: 'Prosecutor',
      title: 'Прокурор (Державний обвинувач)',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      borderColor: currentRole === 'Prosecutor' ? 'border-amber-500 bg-[#1c1813]' : 'border-[#1f242d] bg-[#12151b] hover:border-slate-700',
      description: 'Доведення вини, кваліфікація складу злочину, видача ордерів та підготовка обвинувачення.'
    },
    {
      id: 'Officer',
      title: 'Офіцер / Агент (Правоохоронець)',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      borderColor: currentRole === 'Officer' ? 'border-blue-500 bg-[#121824]' : 'border-[#1f242d] bg-[#12151b] hover:border-slate-700',
      description: 'Правомірність дій, обґрунтування стадій сили, мегафонів та первинного обшуку.'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Роль для ШІ-аналізу та документів:
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roles.map((r) => {
          const isSelected = currentRole === r.id;
          return (
            <div
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`cursor-pointer rounded-xl p-3.5 border transition-all ${r.borderColor}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-white">
                  {r.title}
                </span>
                {isSelected && (
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${r.badgeColor}`}>
                    Активна
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {r.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
