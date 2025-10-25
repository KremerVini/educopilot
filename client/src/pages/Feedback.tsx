import StudentResponseCard from "@/components/StudentResponseCard";
import SentimentBadge from "@/components/SentimentBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { StudentResponse } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type SentimentType = "positive" | "neutral" | "negative" | "alert";

export default function Feedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSentiment, setFilterSentiment] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [responseText, setResponseText] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: responses = [], isLoading } = useQuery<StudentResponse[]>({
    queryKey: ["/api/feedback"],
  });

  const analyzeMutation = useMutation({
    mutationFn: async (data: { studentName: string; responseText: string }) => {
      const res = await apiRequest("POST", "/api/feedback/analyze", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      setIsDialogOpen(false);
      setStudentName("");
      setResponseText("");
      toast({
        title: "Feedback Analisado!",
        description: "O sentimento foi analisado e salvo com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao Analisar",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeMutation.mutate({ studentName, responseText });
  };

  const sentimentCounts = {
    positive: responses.filter(r => r.sentiment === "positive").length,
    neutral: responses.filter(r => r.sentiment === "neutral").length,
    negative: responses.filter(r => r.sentiment === "negative").length,
    alert: responses.filter(r => r.sentiment === "alert").length,
  };

  const filteredResponses = responses.filter((response) => {
    const matchesSearch = response.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.responseText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment = filterSentiment === "all" || response.sentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

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
          <h1 className="text-4xl font-bold mb-2">Feedback Emocional</h1>
          <p className="text-muted-foreground">
            Análise de sentimentos nas respostas dos alunos para identificar necessidades emocionais.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-feedback">
              <Plus className="w-4 h-4 mr-2" />
              Analisar Resposta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Analisar Feedback de Aluno</DialogTitle>
              <DialogDescription>
                Digite a resposta do aluno e nossa IA analisará o sentimento emocional.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Nome do Aluno</Label>
                <Input
                  id="studentName"
                  placeholder="Ex: Ana Silva"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  data-testid="input-student-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responseText">Resposta do Aluno</Label>
                <Textarea
                  id="responseText"
                  placeholder="Digite a resposta ou feedback do aluno..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={6}
                  required
                  data-testid="input-response-text"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={analyzeMutation.isPending}
                data-testid="button-submit-analysis"
              >
                {analyzeMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando com IA...
                  </>
                ) : (
                  "Analisar Sentimento"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Entusiasmo</p>
            <SentimentBadge sentiment="positive" size="sm" />
          </div>
          <p className="text-2xl font-bold">{sentimentCounts.positive}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Neutro</p>
            <SentimentBadge sentiment="neutral" size="sm" />
          </div>
          <p className="text-2xl font-bold">{sentimentCounts.neutral}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Desmotivação</p>
            <SentimentBadge sentiment="negative" size="sm" />
          </div>
          <p className="text-2xl font-bold">{sentimentCounts.negative}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Alertas</p>
            <SentimentBadge sentiment="alert" size="sm" />
          </div>
          <p className="text-2xl font-bold">{sentimentCounts.alert}</p>
        </Card>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por aluno ou mensagem..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-feedback"
          />
        </div>
        <Select value={filterSentiment} onValueChange={setFilterSentiment}>
          <SelectTrigger className="w-[200px]" data-testid="select-filter-sentiment">
            <SelectValue placeholder="Filtrar por sentimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="positive">Entusiasmo</SelectItem>
            <SelectItem value="neutral">Neutro</SelectItem>
            <SelectItem value="negative">Desmotivação</SelectItem>
            <SelectItem value="alert">Alertas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredResponses.map((response) => (
          <StudentResponseCard 
            key={response.id}
            studentName={response.studentName}
            responseText={response.responseText}
            sentiment={response.sentiment as SentimentType}
            confidence={response.confidence}
            createdAt={new Date(response.createdAt)}
          />
        ))}
      </div>

      {filteredResponses.length === 0 && responses.length > 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum feedback encontrado com os filtros selecionados.
          </p>
        </div>
      )}

      {responses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Ainda não há feedbacks analisados.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Primeira Análise
          </Button>
        </div>
      )}
    </div>
  );
}
