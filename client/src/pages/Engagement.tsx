import EngagementChart from "@/components/EngagementChart";
import MetricCard from "@/components/MetricCard";
import ActivitySuggestionCard from "@/components/ActivitySuggestionCard";
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react";

// todo: remove mock functionality
const mockEngagementData = [
  { day: 'Seg', participation: 85, responseTime: 12 },
  { day: 'Ter', participation: 78, responseTime: 15 },
  { day: 'Qua', participation: 92, responseTime: 10 },
  { day: 'Qui', participation: 88, responseTime: 11 },
  { day: 'Sex', participation: 95, responseTime: 9 },
];

const mockResponseTimeData = [
  { day: 'Seg', participation: 12, responseTime: 12 },
  { day: 'Ter', participation: 15, responseTime: 15 },
  { day: 'Qua', participation: 10, responseTime: 10 },
  { day: 'Qui', participation: 11, responseTime: 11 },
  { day: 'Sex', participation: 9, responseTime: 9 },
];

const mockSuggestions = [
  {
    title: "Pausas Criativas",
    description: "Adicione intervalos de 5 minutos entre atividades para melhorar a concentração.",
    category: "Pedagogia",
    impact: "high" as const,
  },
  {
    title: "Trabalho em Grupo",
    description: "Organize atividades colaborativas para aumentar a participação dos alunos mais quietos.",
    category: "Colaboração",
    impact: "medium" as const,
  },
  {
    title: "Feedback Visual",
    description: "Use gráficos e imagens para reforçar conceitos abstratos.",
    category: "Recursos Visuais",
    impact: "medium" as const,
  },
];

export default function Engagement() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Insights de Engajamento</h1>
        <p className="text-muted-foreground">
          Analise a participação e comportamento dos seus alunos ao longo do tempo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Participação Média"
          value="87.6%"
          subtitle="Últimos 7 dias"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Tempo de Resposta"
          value="11.4 min"
          subtitle="Média semanal"
          icon={Clock}
          trend={{ value: 12, isPositive: false }}
        />
        <MetricCard
          title="Atividades Completas"
          value="156"
          subtitle="Esta semana"
          icon={CheckCircle}
          trend={{ value: 23, isPositive: true }}
        />
        <MetricCard
          title="Taxa de Melhoria"
          value="+15%"
          subtitle="vs. mês anterior"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementChart data={mockEngagementData} title="Participação Semanal (%)" />
        <EngagementChart data={mockResponseTimeData} title="Tempo Médio de Resposta (min)" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Sugestões para Melhorar Engajamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSuggestions.map((suggestion, index) => (
            <ActivitySuggestionCard
              key={index}
              {...suggestion}
              onAccept={() => console.log('Accepted:', suggestion.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
