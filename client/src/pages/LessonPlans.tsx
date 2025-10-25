import LessonPlanCard from "@/components/LessonPlanCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LessonPlan } from "@shared/schema";

export default function LessonPlans() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: lessonPlans = [], isLoading } = useQuery<LessonPlan[]>({
    queryKey: ["/api/lesson-plans"],
  });

  const filteredPlans = lessonPlans.filter(
    (plan) =>
      plan.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (id: string) => {
    const plan = lessonPlans.find(p => p.id === id);
    if (plan) {
      alert(`Plano de Aula: ${plan.topic}\n\nObjetivos:\n${plan.objectives.join('\n')}\n\nAtividades:\n${plan.activities.join('\n')}\n\nRecursos:\n${plan.resources.join('\n')}\n\nAvaliação:\n${plan.assessment}`);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Meus Planos de Aula</h1>
          <p className="text-muted-foreground">
            {lessonPlans.length} {lessonPlans.length === 1 ? 'plano salvo' : 'planos salvos'}
          </p>
        </div>
        <Link href="/generate">
          <Button data-testid="button-new-plan">
            <Plus className="w-4 h-4 mr-2" />
            Novo Plano
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por disciplina ou tema..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-plans"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
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

      {filteredPlans.length === 0 && lessonPlans.length > 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum plano de aula encontrado com essa busca.
          </p>
        </div>
      )}

      {lessonPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Você ainda não criou nenhum plano de aula.
          </p>
          <Link href="/generate">
            <Button>Criar Primeiro Plano</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
