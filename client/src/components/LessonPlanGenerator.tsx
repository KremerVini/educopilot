import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

interface LessonPlanFormData {
  subject: string;
  topic: string;
  gradeLevel: string;
  duration: string;
  objectives: string;
}

interface LessonPlanGeneratorProps {
  onGenerate?: (data: LessonPlanFormData) => void;
}

export default function LessonPlanGenerator({ onGenerate }: LessonPlanGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<LessonPlanFormData>({
    subject: "",
    topic: "",
    gradeLevel: "",
    duration: "",
    objectives: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      onGenerate?.(formData);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-semibold">Gerar Plano de Aula</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Disciplina</Label>
            <Input
              id="subject"
              placeholder="Ex: Matemática"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              data-testid="input-subject"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gradeLevel">Nível Escolar</Label>
            <Select
              value={formData.gradeLevel}
              onValueChange={(value) => setFormData({ ...formData, gradeLevel: value })}
              required
            >
              <SelectTrigger id="gradeLevel" data-testid="select-grade-level">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1ano">1º Ano</SelectItem>
                <SelectItem value="2ano">2º Ano</SelectItem>
                <SelectItem value="3ano">3º Ano</SelectItem>
                <SelectItem value="4ano">4º Ano</SelectItem>
                <SelectItem value="5ano">5º Ano</SelectItem>
                <SelectItem value="6ano">6º Ano</SelectItem>
                <SelectItem value="7ano">7º Ano</SelectItem>
                <SelectItem value="8ano">8º Ano</SelectItem>
                <SelectItem value="9ano">9º Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">Tema da Aula</Label>
          <Input
            id="topic"
            placeholder="Ex: Introdução às Frações"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            required
            data-testid="input-topic"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duração (minutos)</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
          >
            <SelectTrigger id="duration" data-testid="select-duration">
              <SelectValue placeholder="Selecione a duração" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="45">45 minutos</SelectItem>
              <SelectItem value="50">50 minutos</SelectItem>
              <SelectItem value="60">60 minutos</SelectItem>
              <SelectItem value="90">90 minutos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objectives">Objetivos Pedagógicos</Label>
          <Textarea
            id="objectives"
            placeholder="Descreva os principais objetivos da aula..."
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            rows={4}
            required
            data-testid="input-objectives"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isGenerating}
          data-testid="button-generate-plan"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Gerando com IA...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Plano de Aula
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
