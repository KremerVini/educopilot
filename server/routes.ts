import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLessonPlan, analyzeSentiment, generateActivitySuggestions } from "./ai";
import { insertLessonPlanSchema, insertStudentResponseSchema } from "@shared/schema";

// Mock user ID for MVP - in production this would come from authentication
const MOCK_USER_ID = "teacher-1";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate lesson plan with AI
  app.post("/api/lesson-plans/generate", async (req, res) => {
    try {
      const { subject, topic, gradeLevel, duration, objectives } = req.body;
      
      if (!subject || !topic || !gradeLevel || !duration || !objectives) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      const aiResult = await generateLessonPlan({
        subject,
        topic,
        gradeLevel,
        duration: parseInt(duration),
        objectives,
      });

      const lessonPlan = await storage.createLessonPlan({
        userId: MOCK_USER_ID,
        subject,
        topic,
        gradeLevel,
        duration: parseInt(duration),
        objectives: aiResult.objectives,
        activities: aiResult.activities,
        resources: aiResult.resources,
        assessment: aiResult.assessment,
      });

      res.json(lessonPlan);
    } catch (error: any) {
      console.error("Error generating lesson plan:", error);
      res.status(500).json({ error: error.message || "Erro ao gerar plano de aula" });
    }
  });

  // Get all lesson plans
  app.get("/api/lesson-plans", async (req, res) => {
    try {
      const plans = await storage.getLessonPlans(MOCK_USER_ID);
      res.json(plans);
    } catch (error: any) {
      console.error("Error fetching lesson plans:", error);
      res.status(500).json({ error: "Erro ao buscar planos de aula" });
    }
  });

  // Get single lesson plan
  app.get("/api/lesson-plans/:id", async (req, res) => {
    try {
      const plan = await storage.getLessonPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ error: "Plano de aula não encontrado" });
      }
      res.json(plan);
    } catch (error: any) {
      console.error("Error fetching lesson plan:", error);
      res.status(500).json({ error: "Erro ao buscar plano de aula" });
    }
  });

  // Analyze student response sentiment
  app.post("/api/feedback/analyze", async (req, res) => {
    try {
      const { studentName, responseText } = req.body;
      
      if (!studentName || !responseText) {
        return res.status(400).json({ error: "Nome do aluno e resposta são obrigatórios" });
      }

      const analysis = await analyzeSentiment(responseText);

      const response = await storage.createStudentResponse({
        userId: MOCK_USER_ID,
        studentName,
        responseText,
        sentiment: analysis.sentiment,
        confidence: analysis.confidence,
      });

      res.json(response);
    } catch (error: any) {
      console.error("Error analyzing sentiment:", error);
      res.status(500).json({ error: error.message || "Erro ao analisar sentimento" });
    }
  });

  // Get all student responses
  app.get("/api/feedback", async (req, res) => {
    try {
      const responses = await storage.getStudentResponses(MOCK_USER_ID);
      res.json(responses);
    } catch (error: any) {
      console.error("Error fetching student responses:", error);
      res.status(500).json({ error: "Erro ao buscar feedbacks" });
    }
  });

  // Generate activity suggestions
  app.post("/api/suggestions", async (req, res) => {
    try {
      const { subject, gradeLevel, currentEngagement } = req.body;
      
      if (!subject || !gradeLevel) {
        return res.status(400).json({ error: "Disciplina e nível escolar são obrigatórios" });
      }

      const suggestions = await generateActivitySuggestions(
        subject,
        gradeLevel,
        currentEngagement ?? 85
      );

      res.json(suggestions);
    } catch (error: any) {
      console.error("Error generating suggestions:", error);
      res.status(500).json({ error: error.message || "Erro ao gerar sugestões" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
