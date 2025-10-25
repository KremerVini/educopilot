import MetricCard from '../MetricCard';
import { Users } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <MetricCard
      title="Taxa de Participação"
      value="87%"
      subtitle="34 de 39 alunos"
      icon={Users}
      trend={{ value: 12, isPositive: true }}
    />
  );
}
