export type UserRole = 'Advocate' | 'Prosecutor' | 'Officer';

export interface LawArticle {
  id: string;
  lawId: string;
  lawName: string;
  shortCode?: string;
  chapter?: string;
  articleNumber: string;
  title: string;
  content: string;
  category: 'code' | 'law' | 'procedure';
  tags: string[];
}

export interface LawDocument {
  id: string;
  title: string;
  shortTitle: string;
  shortCode: string;
  dotColor: string; // e.g. '#06b6d4'
  category: 'Кодекси' | 'Силові структури' | 'Уряд та Суд' | 'Права та Регулювання';
  description: string;
  articles: LawArticle[];
}

export interface OffenseElements {
  object: string;        // Об'єкт (на що посягнули)
  objectiveSide: string; // Об'єктивна сторона (що саме сталося, діяння, наслідки)
  subject: string;       // Суб'єкт (хто вчинив, вік, статус)
  subjectiveSide: string;// Суб'єктивна сторона (форми вини: умисел, легковажність, недбалість, мотив)
}

export interface CitedArticle {
  lawName: string;
  articleNumber: string;
  title: string;
  quote?: string;
  relevance: string;
}

export interface AnalysisResult {
  role: UserRole;
  caseTitle: string;
  summary: string;
  elements: OffenseElements;
  roleArgumentation: {
    mainStrategy: string;
    keyArguments: string[];
    potentialCounterArguments: string[];
    proceduralNextSteps: string[];
  };
  citedArticles: CitedArticle[];
  proceduralViolations?: string[];
  penaltyAssessment?: {
    jailTimeMonths?: number;
    wantedPriority?: number;
    fineAmount?: number;
    hasCriminalRecord?: boolean;
    isBailAllowed?: boolean;
    bailAmountRange?: string;
  };
  recommendedDocuments: {
    title: string;
    type: string;
    templateText: string;
  }[];
}

export interface SampleCase {
  id: string;
  title: string;
  role: UserRole;
  category: string;
  description: string;
  incidentText: string;
}

export interface CriminalArticleRule {
  article: string;
  lawName: string;
  title: string;
  priority: number;
  jailTime: number; // in months
  fine: number; // in USD
  hasRecord: boolean;
  bailAllowed: boolean;
  bailRange?: string;
}
