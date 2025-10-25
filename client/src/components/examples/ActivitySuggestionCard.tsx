import ActivitySuggestionCard from '../ActivitySuggestionCard';

export default function ActivitySuggestionCardExample() {
  return (
    <ActivitySuggestionCard
      title="Quiz Interativo sobre Frações"
      description="Crie um quiz rápido com perguntas de múltipla escolha para reforçar o aprendizado. Isso pode aumentar o engajamento em 25%."
      category="Gamificação"
      impact="high"
      onAccept={() => console.log('Suggestion accepted')}
    />
  );
}
