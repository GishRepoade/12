import React, { useState } from 'react';
import { CheckSquare, ShieldCheck, Scale, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

interface ChecklistStep {
  stepNumber: number;
  title: string;
  description: string;
  articleRef: string;
  warning?: string;
}

interface WorkflowGuide {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  steps: ChecklistStep[];
}

export const ProceduralChecklist: React.FC = () => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('arrest_civ');
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const workflows: WorkflowGuide[] = [
    {
      id: 'arrest_civ',
      title: 'Затримання цивільної особи (Стандартне)',
      category: 'Процесуальний кодекс',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      steps: [
        {
          stepNumber: 1,
          title: 'Одягнути наручники',
          description: 'Одягнути наручники на затримуваного громадянина, підозрюваного у скоєнні правопорушення.',
          articleRef: 'ПК Розділ III ст. 2 п.1'
        },
        {
          stepNumber: 2,
          title: 'Представитися та показати жетон / посвідчення',
          description: 'Повідомити орган, пред\'явити розпізнавальний знак (жетон/бейдж/шеврон) або показати посвідчення.',
          articleRef: 'ПК Розділ III ст. 2 п.2, Закон про ДД'
        },
        {
          stepNumber: 3,
          title: 'Назвати та роз\'яснити статті затримання',
          description: 'Чітко оголосити номери статей КК/АК/ДК та доступною мовою пояснити суть звинувачення.',
          articleRef: 'ПК Розділ III ст. 2 п.3'
        },
        {
          stepNumber: 4,
          title: 'Зачитати Правило Міранди',
          description: 'Зачитати затриманому його конституційні права ("Ви маєте право зберігати мовчання..."). Якщо не зрозумів — зачитати повторно (максимум 2 рази).',
          articleRef: 'ПК Розділ I ст. 1, Розділ III ст. 2 п.4'
        },
        {
          stepNumber: 5,
          title: 'Первинний обшук на місці',
          description: 'Перевірити документи (фото/паспорт), зняти маску з обличчя, перевірити на наявність незаконних/небезпечних речовин та зброї.',
          articleRef: 'ПК Розділ III ст. 2 п.5'
        },
        {
          stepNumber: 6,
          title: 'Транспортування в ІТТ (LSPD / BCSD / FIB)',
          description: 'Посадити закутого затриманого в службовий транспорт та доставити до приміщення ІТТ.',
          articleRef: 'ПК Розділ III ст. 2 п.6'
        },
        {
          stepNumber: 7,
          title: 'Реалізація прав (Адвокат & Телефонний дзвінок)',
          description: 'Викликати адвоката у рацію департаменту (очікування відповіді 5 хв, приїзду 10 хв). Надати право на 1 дзвінок до 5 хвилин.',
          articleRef: 'ПК Розділ III ст. 2.2, ст. 6'
        },
        {
          stepNumber: 8,
          title: 'Вторинний обшук & Заповнення протоколу',
          description: 'Вилучити всі нелегальні предмети, зброю та спецзасоби. Заповнити розшук/протокол та помістити в камеру.',
          articleRef: 'ПК Розділ IV ст. 1'
        }
      ]
    },
    {
      id: 'arrest_state',
      title: 'Затримання Державного Службовця',
      category: 'Спеціальний порядок',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      steps: [
        {
          stepNumber: 1,
          title: 'Первинне затримання та ідентифікація',
          description: 'Одягнути наручники, представитися, встановити факт належності особи до держструктури (посвідчення/жетон).',
          articleRef: 'ПК Розділ III ст. 5 п.1'
        },
        {
          stepNumber: 2,
          title: 'Обов\'язковий виклик Керівництва затриманого та Прокурора',
          description: 'Викликати у рацію департаменту керівництво держслужбовця та Офіс Генерального Прокурора. Час заморожується до 15 хвилин.',
          articleRef: 'ПК Розділ III ст. 5 п.1',
          warning: 'Якщо Прокурор не відповів протягом 15 хвилин — затриманого ОБОВ\'ЯЗКОВО ЗВІЛЬНИТИ та передати матеріали до ОГП!'
        },
        {
          stepNumber: 3,
          title: 'Надання відеофіксації Прокурору та Керівництву',
          description: 'Надати повну відеофіксацію порушення. Прокурор дає правову оцінку дії/бездіяльності затриманого.',
          articleRef: 'ПК Розділ III ст. 5 п.2'
        },
        {
          stepNumber: 4,
          title: 'Рішення Прокурора & Звільнення з посади',
          description: 'Якщо Прокурор підтверджує кримінальне діяння — керівництво ЗВІЛЬНЯЄ співробітника, після чого триває процедура арешту.',
          articleRef: 'ПК Розділ III ст. 5 п.2'
        }
      ]
    },
    {
      id: 'traffic_stop',
      title: 'Трафік-стоп та Погоня за ТЗ',
      category: 'Дорожній кодекс',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      steps: [
        {
          stepNumber: 1,
          title: 'Перший мегафон (Законна вимога)',
          description: 'Оголосити в мегафон вимогу зупинити ТЗ та заглушити двигун.',
          articleRef: 'ДК Розділ III ст. 5.1.1'
        },
        {
          stepNumber: 2,
          title: 'Другий мегафон (Інтервал не менше 10 сек)',
          description: 'Повторна вимога зупинки + дозвіл на таран ТЗ для зупинки (штраф $10,000 за ст. 3.3.1 ДК).',
          articleRef: 'ДК Розділ III ст. 5.1.2'
        },
        {
          stepNumber: 3,
          title: 'Третій мегафон (Вогонь по колесах)',
          description: 'Третя вимога (через 10 сек). Дозвіл відкрити вогонь по колесах ТЗ + затримання за ст. 10.12 КК.',
          articleRef: 'ДК Розділ III ст. 5.1.3'
        },
        {
          stepNumber: 4,
          title: 'Перевірка документів та накладення штрафу',
          description: 'Представитися, показати жетон, роз\'яснити причину зупинки, перевірити права/паспорт та виписати штраф/протокол.',
          articleRef: 'ДК Розділ III ст. 5.2 - 5.6'
        }
      ]
    },
    {
      id: 'immunity_arrest',
      title: 'Затримання Недоторканної особи (ст. 7.2)',
      category: 'Закон про Недоторканність',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      steps: [
        {
          stepNumber: 1,
          title: 'Перевірка статусу недоторканності',
          description: 'Перевірити чи особа є Губернатором, Міністром, Суддею чи Головою держструктури.',
          articleRef: 'Закон про Недоторканність ст. 2'
        },
        {
          stepNumber: 2,
          title: 'Перевірка виняткового переліку статей 7.2 КК',
          description: 'Недоторканного можна затримати НА МІСЦІ тільки за статті з ст. 7.2 (напр. 4.1, 4.2, 5.1, 6.8, 8.1, 8.8, 10.5, 13.1). За інші статті (напр. 10.12) затримання без ордеру СУВОРO ЗАБОРОНЕНО!',
          articleRef: 'Закон про Недоторканність ст. 7.2',
          warning: 'Затримання недоторканного без ст. 7.2 тягне за собою кримінальну відповідальність за ст. 11.6 КК!'
        },
        {
          stepNumber: 3,
          title: 'Затримання до 1 години & Виклик Генпрокурора',
          description: 'Негайно викликати Генерального Прокурора або Верховного Суддю для авторизації ордеру IA / RI.',
          articleRef: 'ПК Розділ III ст. 8, Закон про Недоторканність'
        }
      ]
    }
  ];

  const currentWorkflow = workflows.find((w) => w.id === selectedWorkflowId) || workflows[0];
  const activeCompleted = completedSteps[currentWorkflow.id] || [];

  const toggleStep = (stepNum: number) => {
    if (activeCompleted.includes(stepNum)) {
      setCompletedSteps({
        ...completedSteps,
        [currentWorkflow.id]: activeCompleted.filter((s) => s !== stepNum),
      });
    } else {
      setCompletedSteps({
        ...completedSteps,
        [currentWorkflow.id]: [...activeCompleted, stepNum],
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-amber-400" />
          <span>Процедурні Чек-листи & Інструкції Quant RP</span>
        </h2>
        <p className="text-xs text-slate-400">
          Покрокова перевірка дотримання процесуальних норм під час затримання, трафік-стопу, виклику прокурора та роботи з недоторканими особами.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Workflow Menu Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400 px-1 block mb-2">
            Оберіть процедуру:
          </span>
          {workflows.map((wf) => (
            <button
              key={wf.id}
              onClick={() => setSelectedWorkflowId(wf.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                selectedWorkflowId === wf.id
                  ? 'bg-amber-950/30 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-xs font-bold text-white block">{wf.title}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-block mt-1 ${wf.badgeColor}`}>
                  {wf.category}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            </button>
          ))}
        </div>

        {/* Steps List */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">{currentWorkflow.title}</h3>
              <span className="text-xs text-slate-400">
                Виконано: <strong className="text-amber-400">{activeCompleted.length}</strong> з <strong className="text-slate-200">{currentWorkflow.steps.length}</strong> кроків
              </span>
            </div>
            {activeCompleted.length > 0 && (
              <button
                onClick={() => setCompletedSteps({ ...completedSteps, [currentWorkflow.id]: [] })}
                className="text-xs text-slate-400 hover:text-white font-medium"
              >
                Скинути прогрес
              </button>
            )}
          </div>

          <div className="space-y-3">
            {currentWorkflow.steps.map((step) => {
              const isDone = activeCompleted.includes(step.stepNumber);
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => toggleStep(step.stepNumber)}
                  className={`cursor-pointer border rounded-xl p-4 transition-all flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : step.stepNumber}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-xs font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {step.title}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-900 text-amber-400 border border-slate-800">
                        {step.articleRef}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>

                    {step.warning && (
                      <div className="mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 text-[11px] text-rose-300 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{step.warning}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
