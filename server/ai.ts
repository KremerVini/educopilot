import OpenAI from "openai";

// This is using OpenAI's API, which points to OpenAI's API servers and requires your own API key.
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

Seja específico, prático e alinhado com a BNCC (Base Nacional Comum Curricular).`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em educação e planejamento pedagógico. Responda sempre em português do Brasil.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      objectives: Array.isArray(result.objectives) ? result.objectives : [],
      activities: Array.isArray(result.activities) ? result.activities : [],
      resources: Array.isArray(result.resources) ? result.resources : [],
      assessment: result.assessment || "",
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
  const prompt = `Analise o sentimento emocional da seguinte resposta de um aluno:

"${text}"

Classifique o sentimento em uma das categorias:
- positive (entusiasmo, motivação, satisfação)
- neutral (nem positivo nem negativo)
- negative (desmotivação, frustração leve)
- alert (sinais fortes de ansiedade, desânimo profundo, necessita atenção urgente)

Forneça também um nível de confiança (0-100) na sua análise.

Retorne JSON no formato: { "sentiment": "categoria", "confidence": número }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "Você é um especialista em análise de sentimentos educacionais. Responda sempre em JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    const validSentiments = ["positive", "neutral", "negative", "alert"];
    const sentiment = validSentiments.includes(result.sentiment) 
      ? result.sentiment 
      : "neutral";
    
    const confidence = Math.max(0, Math.min(100, Math.round(result.confidence || 50)));
    
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
  const prompt = `Com base nas seguintes informações sobre uma turma:

Disciplina: ${subject}
Nível Escolar: ${gradeLevel}
Engajamento Atual: ${currentEngagement}%

Sugira 3 atividades pedagógicas inovadoras para melhorar o engajamento dos alunos. Para cada atividade, forneça:
- title: título curto e atraente
- description: descrição de como aplicar (máximo 150 caracteres)
- category: categoria (Gamificação, Colaboração, Recursos Visuais, Pedagogia, etc.)
- impact: nível de impacto esperado (high, medium, ou low)

Retorne JSON no formato: { "suggestions": [array de objetos] }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "Você é um consultor pedagógico especializado em engajamento estudantil. Responda em JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!Array.isArray(result.suggestions)) {
      return [];
    }
    
    return result.suggestions.map((s: any) => ({
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
