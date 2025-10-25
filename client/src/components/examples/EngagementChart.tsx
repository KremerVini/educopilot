import EngagementChart from '../EngagementChart';

export default function EngagementChartExample() {
  const mockData = [
    { day: 'Seg', participation: 85, responseTime: 12 },
    { day: 'Ter', participation: 78, responseTime: 15 },
    { day: 'Qua', participation: 92, responseTime: 10 },
    { day: 'Qui', participation: 88, responseTime: 11 },
    { day: 'Sex', participation: 95, responseTime: 9 },
  ];

  return <EngagementChart data={mockData} title="Participação Semanal (%)" />;
}
