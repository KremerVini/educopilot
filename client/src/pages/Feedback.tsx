import StudentResponseCard from "@/components/StudentResponseCard";
import SentimentBadge from "@/components/SentimentBadge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

type SentimentType = "positive" | "neutral" | "negative" | "alert";

// todo: remove mock functionality
const mockResponses = [
  {
    studentName: "Ana Silva",
    responseText: "Adorei a aula de hoje! As atividades práticas com frações ficaram muito mais fáceis de entender quando usamos os exemplos do dia a dia. Consegui finalmente compreender como dividir uma pizza em partes iguais.",
    sentiment: "positive" as SentimentType,
    confidence: 92,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    studentName: "Bruno Costa",
    responseText: "A aula estava ok, mas eu ainda tenho dúvidas sobre como somar frações com denominadores diferentes.",
    sentiment: "neutral" as SentimentType,
    confidence: 78,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    studentName: "Carla Mendes",
    responseText: "Achei a aula muito difícil. Não consegui acompanhar a explicação e fiquei perdida na hora dos exercícios. Preciso de mais tempo para entender.",
    sentiment: "negative" as SentimentType,
    confidence: 85,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    studentName: "Diego Alves",
    responseText: "Não estou gostando de matemática. Acho que nunca vou aprender isso direito.",
    sentiment: "alert" as SentimentType,
    confidence: 95,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    studentName: "Eduarda Lima",
    responseText: "Gostei muito da atividade em grupo! Foi divertido trabalhar com meus colegas e trocar ideias sobre como resolver os problemas.",
    sentiment: "positive" as SentimentType,
    confidence: 89,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
];

const sentimentCounts = {
  positive: mockResponses.filter(r => r.sentiment === "positive").length,
  neutral: mockResponses.filter(r => r.sentiment === "neutral").length,
  negative: mockResponses.filter(r => r.sentiment === "negative").length,
  alert: mockResponses.filter(r => r.sentiment === "alert").length,
};

export default function Feedback() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSentiment, setFilterSentiment] = useState<string>("all");

  const filteredResponses = mockResponses.filter((response) => {
    const matchesSearch = response.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.responseText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSentiment = filterSentiment === "all" || response.sentiment === filterSentiment;
    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Feedback Emocional</h1>
        <p className="text-muted-foreground">
          Análise de sentimentos nas respostas dos alunos para identificar necessidades emocionais.
        </p>
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
        {filteredResponses.map((response, index) => (
          <StudentResponseCard key={index} {...response} />
        ))}
      </div>

      {filteredResponses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nenhum feedback encontrado com os filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
