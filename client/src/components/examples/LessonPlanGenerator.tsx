import LessonPlanGenerator from '../LessonPlanGenerator';

export default function LessonPlanGeneratorExample() {
  return (
    <LessonPlanGenerator
      onGenerate={(data) => console.log('Generated lesson plan:', data)}
    />
  );
}
