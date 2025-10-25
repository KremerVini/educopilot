import LessonPlanGenerator from "@/components/LessonPlanGenerator";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function Generate() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/lesson-plans/generate", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/lesson-plans"] });
      toast({
        title: "Plano de Aula Gerado!",
        description: "Seu plano foi criado com sucesso e salvo na biblioteca.",
      });
      setLocation("/lesson-plans");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao Gerar Plano",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = (data: any) => {
    generateMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Criar Plano de Aula com IA</h1>
        <p className="text-muted-foreground">
          Preencha os campos abaixo e nossa IA criará um plano de aula personalizado para você.
        </p>
      </div>

      <LessonPlanGenerator onGenerate={handleGenerate} />
    </div>
  );
}
