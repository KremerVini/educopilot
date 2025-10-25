import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface LessonPlanInput {
  subject: string;
  topic: string;
  gradeLevel: string;
  duration: number;
  objectives: string;
}

interface LessonPlanOutput {
  objectives: string[];
  activities: string[];
  resources: string[];
  assessment: string;
}

export async function generateLessonPlan(input: LessonPlanInput): Promise<LessonPlanOutput> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Você é um assistente pedagógico especializado. Crie um plano de aula detalhado com base nas seguintes informações:

Disciplina: ${input.subject}
Tema: ${input.topic}
Nível Escolar: ${input.gradeLevel}
Duração: ${input.duration} minutos
Objetivos Pedagógicos: ${input.objectives}

Forneça um plano de aula estruturado em formato JSON com:
- objectives: array de 3-5 objetivos específicos de aprendizagem
- activities: array de 4-6 atividades práticas sequenciais para a aula
- resources: array de 4-6 recursos e materiais necessários
- assessment: texto descritivo de como avaliar o aprendizado dos alunos

Seja específico, prático e alinhado com a BNCC (Base Nacional Comum Curricular).

Responda apenas com o JSON, sem texto adicional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = JSON.parse(text);

    return {
      objectives: Array.isArray(parsed.objectives) ? parsed.objectives : [],
      activities: Array.isArray(parsed.activities) ? parsed.activities : [],
      resources: Array.isArray(parsed.resources) ? parsed.resources : [],
      assessment: parsed.assessment || "",
    };
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    throw new Error("Falha ao gerar plano de aula com IA");
  }
}

interface SentimentAnalysisOutput {
  sentiment: "positive" | "neutral" | "negative" | "alert";
  confidence: number;
}

export async function analyzeSentiment(text: string): Promise<SentimentAnalysisOutput> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Analise o sentimento emocional da seguinte resposta de um aluno:

"${text}"

Classifique o sentimento em uma das categorias:
- positive (entusiasmo, motivação, satisfação)
- neutral (nem positivo nem negativo)
- negative (desmotivação, frustração leve)
- alert (sinais fortes de ansiedade, desânimo profundo, necessita atenção urgente)

Forneça também um nível de confiança (0-100) na sua análise.

Retorne JSON no formato: { "sentiment": "categoria", "confidence": número }

Responda apenas com o JSON, sem texto adicional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = JSON.parse(text);

    const validSentiments = ["positive", "neutral", "negative", "alert"];
    const sentiment = validSentiments.includes(parsed.sentiment)
      ? parsed.sentiment
      : "neutral";

    const confidence = Math.max(0, Math.min(100, Math.round(parsed.confidence || 50)));

    return { sentiment, confidence };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Falha ao analisar sentimento");
  }
}

interface ActivitySuggestion {
  title: string;
  description: string;
  category: string;
  impact: "high" | "medium" | "low";
}

export async function generateActivitySuggestions(
  subject: string,
  gradeLevel: string,
  currentEngagement: number
): Promise<ActivitySuggestion[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Com base nas seguintes informações sobre uma turma:

Disciplina: ${subject}
Nível Escolar: ${gradeLevel}
Engajamento Atual: ${currentEngagement}%

Sugira 3 atividades pedagógicas inovadoras para melhorar o engajamento dos alunos. Para cada atividade, forneça:
- title: título curto e atraente
- description: descrição de como aplicar (máximo 150 caracteres)
- category: categoria (Gamificação, Colaboração, Recursos Visuais, Pedagogia, etc.)
- impact: nível de impacto esperado (high, medium, ou low)

Retorne JSON no formato: { "suggestions": [array de objetos] }

Responda apenas com o JSON, sem texto adicional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed.suggestions)) {
      return [];
    }

    return parsed.suggestions.map((s: any) => ({
      title: s.title || "",
      description: s.description || "",
      category: s.category || "Pedagogia",
      impact: ["high", "medium", "low"].includes(s.impact) ? s.impact : "medium",
    })).slice(0, 3);
  } catch (error) {
    console.error("Error generating activity suggestions:", error);
    throw new Error("Falha ao gerar sugestões de atividades");
  }
}
