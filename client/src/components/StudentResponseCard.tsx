import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SentimentBadge from "./SentimentBadge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type SentimentType = "positive" | "neutral" | "negative" | "alert";

interface StudentResponseCardProps {
  studentName: string;
  responseText: string;
  sentiment: SentimentType;
  confidence: number;
  createdAt: Date;
}

export default function StudentResponseCard({
  studentName,
  responseText,
  sentiment,
  confidence,
  createdAt,
}: StudentResponseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 120;
  const needsExpansion = responseText.length > previewLength;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-medium mb-1">{studentName}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
          </p>
        </div>
        <SentimentBadge sentiment={sentiment} confidence={confidence} size="sm" />
      </div>
      <p className="text-sm mb-3">
        {isExpanded || !needsExpansion
          ? responseText
          : `${responseText.substring(0, previewLength)}...`}
      </p>
      {needsExpansion && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-1"
          data-testid="button-expand-response"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Ver mais
            </>
          )}
        </Button>
      )}
    </Card>
  );
}
