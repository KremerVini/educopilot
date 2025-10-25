import StudentResponseCard from '../StudentResponseCard';

export default function StudentResponseCardExample() {
  return (
    <StudentResponseCard
      studentName="Ana Silva"
      responseText="Adorei a aula de hoje! As atividades práticas com frações ficaram muito mais fáceis de entender quando usamos os exemplos do dia a dia. Consegui finalmente compreender como dividir uma pizza em partes iguais e calcular quanto cada pessoa recebe."
      sentiment="positive"
      confidence={92}
      createdAt={new Date(Date.now() - 1000 * 60 * 30)}
    />
  );
}
