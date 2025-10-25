import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Download, Clock, GraduationCap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LessonPlanCardProps {
  id: string;
  subject: string;
  topic: string;
  gradeLevel: string;
  duration: number;
  createdAt: Date;
  onView?: (id: string) => void;
  onExport?: (id: string) => void;
}

export default function LessonPlanCard({
  id,
  subject,
  topic,
  gradeLevel,
  duration,
  createdAt,
  onView,
  onExport,
}: LessonPlanCardProps) {
  return (
    <Card className="p-6 hover-elevate active-elevate-2 transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-accent-foreground" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{topic}</h3>
          <p className="text-sm text-muted-foreground mb-3">{subject}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <GraduationCap className="w-3 h-3" />
              {gradeLevel}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Clock className="w-3 h-3" />
              {duration} min
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t gap-2">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onView?.(id)}
            data-testid={`button-view-${id}`}
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onExport?.(id)}
            data-testid={`button-export-${id}`}
          >
            <Download className="w-4 h-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>
    </Card>
  );
}
