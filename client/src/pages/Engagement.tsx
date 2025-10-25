import EngagementChart from "@/components/EngagementChart";
import MetricCard from "@/components/MetricCard";
import ActivitySuggestionCard from "@/components/ActivitySuggestionCard";
import { Users, Clock, CheckCircle, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

interface ActivitySuggestion {
  title: string;
  description: string;
  category: string;
  impact: "high" | "medium" | "low";
}

export default function Engagement() {
  const [suggestions, setSuggestions] = useState<ActivitySuggestion[]>([]);
  const { toast } = useToast();

  const generateSuggestionsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/suggestions", {
        subject: "Matemática",
        gradeLevel: "5º Ano",
        currentEngagement: 87,
      });
      return await res.json();
    },
    onSuccess: (data: ActivitySuggestion[]) => {
      setSuggestions(data);
      toast({
        title: "Sugestões Geradas!",
        description: "Novas atividades foram sugeridas pela IA.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao Gerar Sugestões",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Sugestões para Melhorar Engajamento</h2>
          <Button
            onClick={() => generateSuggestionsMutation.mutate()}
            disabled={generateSuggestionsMutation.isPending}
            data-testid="button-generate-suggestions"
          >
            {generateSuggestionsMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Novas Sugestões
              </>
            )}
          </Button>
        </div>
        {suggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <ActivitySuggestionCard
                key={index}
                {...suggestion}
                onAccept={() => console.log('Accepted:', suggestion.title)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">
              Clique no botão acima para gerar sugestões personalizadas com IA.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
