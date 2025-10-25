import LessonPlanGenerator from "@/components/LessonPlanGenerator";
import { useToast } from "@/hooks/use-toast";

export default function Generate() {
  const { toast } = useToast();

  const handleGenerate = (data: any) => {
    console.log('Generating lesson plan with data:', data);
    toast({
      title: "Plano de Aula Gerado!",
      description: "Seu plano foi criado com sucesso e salvo na biblioteca.",
    });
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
