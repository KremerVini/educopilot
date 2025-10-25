import LessonPlanCard from '../LessonPlanCard';

export default function LessonPlanCardExample() {
  return (
    <LessonPlanCard
      id="1"
      subject="Matemática"
      topic="Introdução às Frações"
      gradeLevel="5º Ano"
      duration={50}
      createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)}
      onView={(id) => console.log('View lesson plan:', id)}
      onExport={(id) => console.log('Export lesson plan:', id)}
    />
  );
}
