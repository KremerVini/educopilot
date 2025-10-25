import MetricCard from "@/components/MetricCard";
import LessonPlanCard from "@/components/LessonPlanCard";
import EngagementChart from "@/components/EngagementChart";
import ActivitySuggestionCard from "@/components/ActivitySuggestionCard";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { LessonPlan, StudentResponse } from "@shared/schema";
import { Loader2 } from "lucide-react";

// todo: remove mock functionality
const mockEngagementData = [
  { day: 'Seg', participation: 85, responseTime: 12 },
  { day: 'Ter', participation: 78, responseTime: 15 },
  { day: 'Qua', participation: 92, responseTime: 10 },
  { day: 'Qui', participation: 88, responseTime: 11 },
  { day: 'Sex', participation: 95, responseTime: 9 },
];

const mockSuggestions = [
  {
    title: "Quiz Interativo sobre Frações",
    description: "Crie um quiz rápido com perguntas de múltipla escolha para reforçar o aprendizado.",
    category: "Gamificação",
    impact: "high" as const,
  },
  {
    title: "Debate em Grupo",
    description: "Organize um debate sobre o tema da semana para estimular pensamento crítico.",
    category: "Colaboração",
    impact: "medium" as const,
  },
];

export default function Dashboard() {
  const { data: lessonPlans = [], isLoading: plansLoading } = useQuery<LessonPlan[]>({
    queryKey: ["/api/lesson-plans"],
  });

  const { data: responses = [], isLoading: responsesLoading } = useQuery<StudentResponse[]>({
    queryKey: ["/api/feedback"],
  });

  const handleView = (id: string) => {
    const plan = lessonPlans.find(p => p.id === id);
    if (plan) {
      alert(`Plano de Aula: ${plan.topic}\n\nObjetivos:\n${plan.objectives.join('\n')}\n\nAtividades:\n${plan.activities.join('\n')}`);
    }
  };

  const handleExport = (id: string) => {
    const plan = lessonPlans.find(p => p.id === id);
    if (plan) {
      const content = `PLANO DE AULA\n\nDisciplina: ${plan.subject}\nTema: ${plan.topic}\nNível: ${plan.gradeLevel}\nDuração: ${plan.duration} minutos\n\nOBJETIVOS:\n${plan.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\nATIVIDADES:\n${plan.activities.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nRECURSOS:\n${plan.resources.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nAVALIAÇÃO:\n${plan.assessment}`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plano-aula-${plan.topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const alertCount = responses.filter(r => r.sentiment === "alert").length;
  
  const avgParticipation = mockEngagementData.reduce((sum, d) => sum + d.participation, 0) / mockEngagementData.length;

  if (plansLoading || responsesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Bem-vindo de volta, Professor!</h1>
        <p className="text-muted-foreground">
          Aqui está um resumo do engajamento dos seus alunos esta semana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Taxa de Participação"
          value={`${Math.round(avgParticipation)}%`}
          subtitle="Média semanal"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Tempo Médio de Resposta"
          value="11 min"
          subtitle="Nas atividades"
          icon={Clock}
          trend={{ value: 8, isPositive: false }}
        />
        <MetricCard
          title="Engajamento Geral"
          value="92%"
          subtitle="Esta semana"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Alertas Emocionais"
          value={alertCount}
          subtitle="Requerem atenção"
          icon={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Planos de Aula Recentes</h2>
              <Link href="/lesson-plans">
                <Button variant="outline" data-testid="button-view-all-plans">
                  Ver Todos
                </Button>
              </Link>
            </div>
            {lessonPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonPlans.slice(0, 2).map((plan) => (
                  <LessonPlanCard
                    key={plan.id}
                    id={plan.id}
                    subject={plan.subject}
                    topic={plan.topic}
                    gradeLevel={plan.gradeLevel}
                    duration={plan.duration}
                    createdAt={new Date(plan.createdAt)}
                    onView={handleView}
                    onExport={handleExport}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">Nenhum plano de aula criado ainda.</p>
                <Link href="/generate">
                  <Button>Criar Primeiro Plano</Button>
                </Link>
              </div>
            )}
          </div>

          <EngagementChart data={mockEngagementData} title="Participação Semanal (%)" />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sugestões de Atividades</h2>
            <div className="space-y-4">
              {mockSuggestions.map((suggestion, index) => (
                <ActivitySuggestionCard
                  key={index}
                  {...suggestion}
                  onAccept={() => console.log('Accepted:', suggestion.title)}
                />
              ))}
            </div>
          </div>

          <Link href="/generate">
            <Button className="w-full" data-testid="button-create-new-plan">
              Criar Novo Plano de Aula
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
