import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown, AlertTriangle } from "lucide-react";

type SentimentType = "positive" | "neutral" | "negative" | "alert";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  confidence?: number;
  size?: "sm" | "default";
}

const sentimentConfig = {
  positive: {
    label: "Entusiasmo",
    icon: Smile,
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  neutral: {
    label: "Neutro",
    icon: Meh,
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
  negative: {
    label: "Desmotivação",
    icon: Frown,
    className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  },
  alert: {
    label: "Alerta",
    icon: AlertTriangle,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
};

export default function SentimentBadge({ sentiment, confidence, size = "default" }: SentimentBadgeProps) {
  const config = sentimentConfig[sentiment];
  const Icon = config.icon;
  
  return (
    <Badge className={`gap-1.5 ${config.className} ${size === "sm" ? "text-xs" : ""}`} variant="outline">
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {config.label}
      {confidence !== undefined && <span className="ml-1 opacity-70">({confidence}%)</span>}
    </Badge>
  );
}
