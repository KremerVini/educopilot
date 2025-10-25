import MetricCard from "@/components/MetricCard";
import LessonPlanCard from "@/components/LessonPlanCard";
import EngagementChart from "@/components/EngagementChart";
import ActivitySuggestionCard from "@/components/ActivitySuggestionCard";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// todo: remove mock functionality
const mockLessonPlans = [
  {
    id: "1",
    subject: "Matemática",
    topic: "Introdução às Frações",
    gradeLevel: "5º Ano",
    duration: 50,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "2",
    subject: "Ciências",
    topic: "Ciclo da Água",
    gradeLevel: "4º Ano",
    duration: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "3",
    subject: "História",
    topic: "Brasil Colonial",
    gradeLevel: "7º Ano",
    duration: 60,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

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
          value="87%"
          subtitle="34 de 39 alunos"
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
          value="3"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockLessonPlans.slice(0, 2).map((plan) => (
                <LessonPlanCard
                  key={plan.id}
                  {...plan}
                  onView={(id) => console.log('View plan:', id)}
                  onExport={(id) => console.log('Export plan:', id)}
                />
              ))}
            </div>
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
