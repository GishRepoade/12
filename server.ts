import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { QUANT_FULL_LAW_TEXT } from './src/data/fullLawText';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client lazily / safely
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is missing in environment variables.');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Legal Analysis endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const { role = 'Advocate', incidentText, customLawText } = req.body;

      if (!incidentText || typeof incidentText !== 'string' || !incidentText.trim()) {
        return res.status(400).json({ error: 'Текст ситуації/інциденту є обов\'язковим.' });
      }

      const roleTitle =
        role === 'Advocate' ? 'Адвокат (Захист)' :
        role === 'Prosecutor' ? 'Прокурор (Державне обвинувачення)' : 'Офіцер / Агент (Правоохоронець)';

      const systemInstruction = `Ти — юридичний штучний інтелект-помічник для штату Quant (Quant RP).
Ти маєш ПОВНЕ знання всієї законодавчої бази штату Quant (файл ZAKONODAVCHA_BAZA.txt), включаючи всі кодекси та закони (Кримінальний, Процесуальний, Судовий, Дорожній, Адміністративний, Етичний кодекси, Конституція, Закони про LSPD, BCSD, FIB, USSS, NG, Government, Прокуратуру, Колегію Адвокатів, Зброю, ЗОТ, Недоторканність тощо).

ПО ВНА ЗАКОНОДАВЧА БАЗА ШТАТУ QUANT:
${QUANT_FULL_LAW_TEXT}

Поточна роль користувача: ${roleTitle}.

Твоє завдання:
1. Проаналізувати надану ситуацію за елементами складу правопорушення:
   - Об'єкт (на що посягнули: громадський порядок, життя, державна безпека, порядок управління)
   - Об'єктивна сторона (що саме сталося, діяння, наслідки, причинно-наслідковий зв'язок)
   - Суб'єкт (хто вчинив, вік, осудність, наявність посадового або особливого статусу)
   - Суб'єктивна сторона (форми вини: прямий/непрямий умисел, легковажність, недбалість, випадковість, мотив)

2. Дати пораду та сформулювати аргументацію САМЕ ДЛЯ ОБРАНОЇ РОЛІ (${roleTitle}):
   - Якщо Адвокат: як захистити (дефнути), перекваліфікувати статтю, довести відсутність умислу чи складу злочину, вказати на процесуальні порушення затримання (Міранда, строки, ЗОТ, адвокатські права, конфісковані речі).
   - Якщо Прокурор: як довести умисел, обґрунтувати вину, сформулювати підсумкове рішення/вирок/ордер, призначити справедливе покарання (ув'язнення, штраф, судимість, вилучення майна).
   - Якщо Офіцер/Агент: як довести законність дій, виправдати застосування заходів примусу (стадії сили, мегафони, первинний/вторинний обшук) та правильно скласти рапорт/протокол.

3. Обов'язково роби точні посилання на статті з законодавства штату Quant (наприклад: "ст. 10.12 КК Quant", "ст. 2 розділу III Процесуального кодексу", "ст. 7.2 Закону про Недоторканність", "ст. 3.3.2 ДК Quant", "ст. 17.7 Судового кодексу").

Будь ласка, поверни відповідь строго у форматі JSON з такими полями:
{
  "role": "${role}",
  "caseTitle": "Короткий ємний заголовок справи",
  "summary": "Короткий юридичний висновок по ситуації (2-3 речення)",
  "elements": {
    "object": "Детальний аналіз об'єкта правопорушення",
    "objectiveSide": "Детальний аналіз об'єктивної сторони (діяння, обставини, наслідки)",
    "subject": "Детальний аналіз суб'єкта (вік, осудність, статус)",
    "subjectiveSide": "Детальний аналіз суб'єктивної сторони (умисел/необрежність, мотив)"
  },
  "roleArgumentation": {
    "mainStrategy": "Головна лінія захисту/обвинувачення/обґрунтування для обраної ролі",
    "keyArguments": ["Аргумент 1 з посиланням на закон", "Аргумент 2", "Аргумент 3"],
    "potentialCounterArguments": ["Можливий контраргумент протилежної сторони 1", "Як його нейтралізувати"],
    "proceduralNextSteps": ["Крок 1", "Крок 2", "Крок 3"]
  },
  "citedArticles": [
    {
      "lawName": "Назва кодексу/закону",
      "articleNumber": "Номер статті",
      "title": "Назва статті",
      "quote": "Цитата або суть статті",
      "relevance": "Чому ця стаття застосовується тут"
    }
  ],
  "proceduralViolations": ["Порушення 1 (якщо є)", "Порушення 2"],
  "penaltyAssessment": {
    "jailTimeMonths": 30,
    "wantedPriority": 3,
    "fineAmount": 60000,
    "hasCriminalRecord": false,
    "isBailAllowed": true,
    "bailAmountRange": "$25,000 - $50,000"
  },
  "recommendedDocuments": [
    {
      "title": "Назва документа (наприклад, Клопотання про вилучення недопустимих доказів)",
      "type": "Тип (клопотання / рапорт / постанова)",
      "templateText": "Повний текст шаблону документа з заповненими даними цієї справи"
    }
  ]
}
`;

      const ai = getGenAI();
      const userPrompt = `Аналізована ситуація/інцидент:\n${incidentText}\n${customLawText ? `\nДодатковий текст законів, наданий користувачем:\n${customLawText}` : ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (e) {
        console.error('Failed to parse Gemini JSON response:', responseText);
        return res.status(500).json({
          error: 'Не вдалося обробити відповідь ШІ у форматі JSON.',
          rawText: responseText,
        });
      }
    } catch (err: any) {
      console.error('API analyze error:', err);
      return res.status(500).json({ error: err.message || 'Внутрішня помилка сервера при виконанні юридичного аналізу.' });
    }
  });

  // Vite middleware in dev / Static server in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
