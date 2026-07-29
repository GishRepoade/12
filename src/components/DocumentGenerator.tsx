import React, { useState } from 'react';
import { FileText, Copy, Check, Download, RefreshCw } from 'lucide-react';

export const DocumentGenerator: React.FC = () => {
  const [docType, setDocType] = useState<string>('protocol');
  const [copied, setCopied] = useState(false);

  // Form fields
  const [officerName, setOfficerName] = useState('Агент FIB / Офіцер LSPD');
  const [officerBadge, setOfficerBadge] = useState('[FIB | CID | John Doe | #1042]');
  const [suspectName, setSuspectName] = useState('Джон Доу (John Doe)');
  const [suspectPassport, setSuspectPassport] = useState('123456');
  const [articles, setArticles] = useState('ст. 8.6 КК, ст. 10.12 КК');
  const [incidentDate, setIncidentDate] = useState(new Date().toLocaleDateString('uk-UA'));
  const [incidentTime, setIncidentDateDetails] = useState('14:30');
  const [evidenceLink, setEvidenceLink] = useState('https://forum.quant5.com.ua/evidence/123');
  const [details, setDetails] = useState('В ході патрулювання зафіксовано виїзд на зустрічну смугу та непідкорення вимозі мегафону. При обшуку виявлено нелегальну зброю.');

  const generateDocumentText = () => {
    if (docType === 'protocol') {
      return `ПРОТОКОЛ ЗАТРИМАННЯ ТА АРЕШТУ № ____
Дата: ${incidentDate} | Час: ${incidentTime}
Місце проведення: ІТТ LSPD / BCSD / FIB

1. Відомості про співробітника:
   Посада, ПІБ, Розпізнавальний знак: ${officerName} ${officerBadge}

2. Відомості про затриманого:
   ПІБ затриманого: ${suspectName}
   Номер паспорта: #${suspectPassport}

3. Правова кваліфікація:
   Інкриміновані статті: ${articles}
   Пріоритет розшуку: 3 ★

4. Хід проведення процесуальних дій:
   - Затримання здійснено о ${incidentTime}. Наручники надіто.
   - Представлено розпізнавальний знак. Статті роз\'яснено.
   - Правило Міранди зачитано (права зрозумілі).
   - Первинний обшук проведено (маску знято, документи перевірено).
   - Реалізовано право на 1 телефонний дзвінок / виклик адвоката.
   - Вторинний обшук проведено. Нелегальні предмети вилучено.

5. Доказова база:
   Запис з боді-камери: ${evidenceLink}

Підпис співробітника: __________________ (${officerName})
`;
    }

    if (docType === 'complaint') {
      return `ДО ОФІСУ ГЕНЕРАЛЬНОГО ПРОКУРОРА ШТАТУ QUANT
ВІД ДЕРЖАВНОГО / ПРИВАТНОГО АДВОКАТА

СКАРГА
на неправомірні дії співробітника державних структур

Я, Адвокат ${officerName}, діючи в інтересах затриманого ${suspectName} (пасп. #${suspectPassport}), подаю дану скаргу на дії співробітника ${officerBadge}.

ОБСТАВИНИ СТРАВИ:
${incidentDate} о ${incidentTime} мого клієнта було затримано з грубим порушенням Процесуального кодексу штату Quant (не зачитано правило Міранди, порушено строки виклику адвоката, проведено обшук без підстав).

ПРАВОВЕ ОБҐРУНТУВАННЯ:
Згідно з ПК Розділ III ст. 4 п.1, затримання здійснене з порушенням порядку затримання підлягає скасуванню, а затриманий — негайному звільненню. Дії співробітника містять ознаки ст. 11.6 КК Quant (Заздалегідь незаконне затримання) та ст. 10.2 КК (Перевищення повноважень).

ПРОШУ:
1. Витребувати відеофіксацію затримання у співробітника ${officerBadge}.
2. Визнати затримання ${suspectName} незаконним та звільнити з-під варти.
3. Притягнути співробітника до відповідальності за ст. 11.6 КК Quant.

Докази: ${evidenceLink}
Дата: ${incidentDate}
Підпис: __________________ (Адвокат)
`;
    }

    if (docType === 'prosecutor_order') {
      return `ПОСТАНОВА ОФІСУ ГЕНЕРАЛЬНОГО ПРОКУРОРА № DJG-___
м. Лос-Сантос, Капітолій | Дата: ${incidentDate}

Про проведення прокурорської перевірки та визнання дій незаконними

Офіс Генерального Прокурора штату Quant у складі Прокурора ${officerName}, розглянувши матеріали затримання громадянина ${suspectName} (пасп. #${suspectPassport}) співробітником ${officerBadge},

ВСТАНОВИВ:
${details}

Керуючись Законом "Про Прокуратуру" та Процесуальним кодексом штату Quant,

ПОСТАНОВИВ:
1. Визнати затримання громадянина ${suspectName} НЕЗАКОННИМ.
2. Негайно звільнити громадянина ${suspectName} з-під варти в ІТТ.
3. Зобов'язати керівництво притягнути співробітника ${officerBadge} до дисциплінарної відповідальності за ст. 7.7 АК Quant.
4. Постанова набирає чинності з моменту підписання.

Прокурор штату Quant: __________________ (${officerName})
`;
    }

    return `ПОЗОВНА ЗАЯВА ДО ФЕДЕРАЛЬНОГО СУДУ № FC-SC-____
Позивач: ${suspectName} (пасп. #${suspectPassport})
Відповідач: Співробітник ${officerBadge}

ПОЗОВНА ЗАЯВА
про відшкодування моральної та матеріальної шкоди за незаконне затримання

ІСНУВАННЯ СПОРУ:
${incidentDate} о ${incidentTime} відповідачем було проведено незаконне затримання позивача. Внаслідок неправомірних дій відповідача позивачу було завдано моральної шкоди, а також вилучено майно.

Вимоги Позивача:
1. Визнати дії відповідача незаконними.
2. Стягнути з організації відповідача компенсацію моральної шкоди у розмірі $150,000.
3. Компенсувати судове мито у розмірі $30,000.

Докази та сплачене мито: ${evidenceLink}
Підпис Позивача / Представника: __________________
`;
  };

  const currentDocText = generateDocumentText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDocText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentDocText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${docType}_${suspectPassport}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-400" />
          <span>Генератор Процесуальних Документів Quant RP</span>
        </h2>
        <p className="text-xs text-slate-400">
          Створюйте юридично точні протоколи затримання, скарги в Прокуратуру, клопотання адвоката, постанови прокурора та позови до суду в 1 клік.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Inputs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase text-slate-300 block pb-2 border-b border-slate-800">
            Налаштування документа:
          </span>

          {/* Doc Type Selector */}
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
              Тип документа:
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/80"
            >
              <option value="protocol">Протокол Затримання & Арешту (Офіцер)</option>
              <option value="complaint">Скарга до Прокуратури (Адвокат)</option>
              <option value="prosecutor_order">Постанова Прокуратури про звільнення (Прокурор)</option>
              <option value="lawsuit">Позовна Заява до Суду (Адвокат/Позивач)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Співробітник / Автор:
            </label>
            <input
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Розпізнавальний знак / Бейдж:
            </label>
            <input
              type="text"
              value={officerBadge}
              onChange={(e) => setOfficerBadge(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Затриманий / Клієнт (ПІБ):
            </label>
            <input
              type="text"
              value={suspectName}
              onChange={(e) => setSuspectName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Номер паспорта затриманого:
            </label>
            <input
              type="text"
              value={suspectPassport}
              onChange={(e) => setSuspectPassport(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Інкриміновані статті:
            </label>
            <input
              type="text"
              value={articles}
              onChange={(e) => setArticles(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Посилання на докази / запис:
            </label>
            <input
              type="text"
              value={evidenceLink}
              onChange={(e) => setEvidenceLink(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Короткий опис обставин:
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
            />
          </div>

        </div>

        {/* Generated Text View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold uppercase text-amber-400">
                Попередній перегляд документа:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Скопійовано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопіювати</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Завантажити TXT</span>
                </button>
              </div>
            </div>

            <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed overflow-x-auto min-h-[380px]">
              {currentDocText}
            </pre>
          </div>

          <div className="text-[11px] text-slate-500 italic text-right pt-2 border-t border-slate-800/50">
            Згенеровано для використання в RP-процесі на сервері Quant RP.
          </div>
        </div>

      </div>

    </div>
  );
};
