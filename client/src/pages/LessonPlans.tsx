import LessonPlanCard from "@/components/LessonPlanCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

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
  {
    id: "4",
    subject: "Português",
    topic: "Verbos e Conjugações",
    gradeLevel: "6º Ano",
    duration: 50,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: "5",
    subject: "Geografia",
    topic: "Biomas Brasileiros",
    gradeLevel: "8º Ano",
    duration: 60,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    id: "6",
    subject: "Matemática",
    topic: "Equações de Primeiro Grau",
    gradeLevel: "7º Ano",
    duration: 50,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
];

export default function LessonPlans() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlans = mockLessonPlans.filter(
    (plan) =>
      plan.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold mb-2">Meus Planos de Aula</h1>
          <p className="text-muted-foreground">
            {mockLessonPlans.length} planos salvos
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
            {...plan}
            onView={(id) => console.log('View plan:', id)}
            onExport={(id) => console.log('Export plan:', id)}
          />
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Nenhum plano de aula encontrado.
          </p>
          <Link href="/generate">
            <Button variant="outline">Criar Primeiro Plano</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
