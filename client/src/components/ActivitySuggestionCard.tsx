import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ActivitySuggestionCardProps {
  title: string;
  description: string;
  category: string;
  impact: "high" | "medium" | "low";
  onAccept?: () => void;
}

const impactConfig = {
  high: { label: "Alto Impacto", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  medium: { label: "Médio Impacto", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
  low: { label: "Baixo Impacto", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" },
};

export default function ActivitySuggestionCard({
  title,
  description,
  category,
  impact,
  onAccept,
}: ActivitySuggestionCardProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    onAccept?.();
  };

  return (
    <Card className={`p-4 ${isAccepted ? 'bg-accent/20' : ''}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 mt-0.5">
          {isAccepted ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Sparkles className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h4 className="font-semibold">{title}</h4>
            <Badge variant="outline" className={impactConfig[impact].className}>
              {impactConfig[impact].label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <p className="text-xs text-muted-foreground">Categoria: {category}</p>
        </div>
      </div>
      {!isAccepted && (
        <Button
          size="sm"
          variant="outline"
          onClick={handleAccept}
          className="w-full"
          data-testid="button-accept-suggestion"
        >
          Aplicar Sugestão
        </Button>
      )}
      {isAccepted && (
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          ✓ Sugestão aceita
        </p>
      )}
    </Card>
  );
}
