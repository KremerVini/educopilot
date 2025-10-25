# Co-Piloto Educacional - Assistente IA para Professores

## Visão Geral
Plataforma web moderna e responsiva que atua como assistente inteligente para professores, oferecendo:
- Geração de planos de aula personalizados com IA
- Análise de engajamento de alunos com visualizações
- Feedback emocional através de análise de sentimentos
- Sugestões de atividades pedagógicas baseadas em IA

## Arquitetura do Projeto

### Stack Tecnológica
- **Frontend**: React + TypeScript + Wouter + TailwindCSS + Shadcn UI
- **Backend**: Express.js + TypeScript
- **IA**: OpenAI GPT-5 para geração de conteúdo e análise de sentimentos
- **Estado**: TanStack React Query para gerenciamento de dados
- **Armazenamento**: MemStorage (em memória) para MVP

### Estrutura de Pastas
```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── lib/          # Utilitários e configurações
│   │   └── hooks/        # React hooks customizados
├── server/                # Backend Express
│   ├── ai.ts            # Integração OpenAI
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Camada de dados
│   └── index.ts         # Entry point
└── shared/              # Tipos compartilhados
    └── schema.ts        # Schemas Drizzle e Zod
```

## Funcionalidades Implementadas

### 1. Dashboard (`/`)
- Visão geral com métricas de engajamento
- Planos de aula recentes
- Gráfico de participação semanal
- Sugestões de atividades
- Alertas emocionais

### 2. Gerador de Planos de Aula (`/generate`)
- Formulário com campos:
  - Disciplina
  - Tema da aula
  - Nível escolar (1º ao 9º ano)
  - Duração (30, 45, 50, 60, 90 minutos)
  - Objetivos pedagógicos
- Geração via OpenAI GPT-5
- Estrutura do plano:
  - Objetivos de aprendizagem
  - Atividades práticas sequenciais
  - Recursos e materiais necessários
  - Método de avaliação

### 3. Biblioteca de Planos (`/lesson-plans`)
- Listagem de todos os planos salvos
- Busca por disciplina ou tema
- Ações: Visualizar e Exportar (TXT)
- Ordenação por data de criação

### 4. Análise de Engajamento (`/engagement`)
- Métricas:
  - Taxa de participação média
  - Tempo médio de resposta
  - Atividades completas
  - Taxa de melhoria
- Gráficos de participação e tempo de resposta
- Geração de sugestões de atividades com IA

### 5. Feedback Emocional (`/feedback`)
- Análise de sentimentos via OpenAI:
  - Positive (Entusiasmo)
  - Neutral
  - Negative (Desmotivação)
  - Alert (Requer atenção urgente)
- Dashboard com contadores de sentimentos
- Filtros por sentimento e busca textual
- Formulário para adicionar novas análises

## API Endpoints

### Planos de Aula
- `POST /api/lesson-plans/generate` - Gera plano de aula com IA
  - Body: `{ subject, topic, gradeLevel, duration, objectives }`
  - Retorna: Plano completo com objetivos, atividades, recursos e avaliação

- `GET /api/lesson-plans` - Lista todos os planos do professor
- `GET /api/lesson-plans/:id` - Busca plano específico

### Feedback Emocional
- `POST /api/feedback/analyze` - Analisa sentimento de resposta
  - Body: `{ studentName, responseText }`
  - Retorna: Análise com sentimento e nível de confiança

- `GET /api/feedback` - Lista todas as respostas analisadas

### Sugestões de Atividades
- `POST /api/suggestions` - Gera sugestões pedagógicas
  - Body: `{ subject, gradeLevel, currentEngagement? }`
  - Retorna: Array de 3 sugestões com título, descrição, categoria e impacto

## Variáveis de Ambiente
- `OPENAI_API_KEY` - Chave da API OpenAI (obrigatória)
- `SESSION_SECRET` - Segredo para sessões Express (configurado)
- `NODE_ENV` - Ambiente de execução (development/production)

## Notas Importantes

### OpenAI API
- O projeto usa GPT-5 (modelo mais recente lançado em agosto de 2025)
- Todas as chamadas à API incluem `response_format: { type: "json_object" }`
- Prompts otimizados para contexto educacional brasileiro (BNCC)
- **Importante**: Certifique-se de que o OPENAI_API_KEY tem quota disponível

### Dados Mock
- Métricas de engajamento no dashboard são dados estáticos para demonstração
- Em produção, esses dados viriam de integração com Google Classroom ou similar
- Marcados com comentários `// todo: remove mock functionality`

### Armazenamento
- MVP usa MemStorage (dados perdidos ao reiniciar)
- Para produção, migrar para PostgreSQL usando Drizzle ORM
- Schemas já definidos em `shared/schema.ts`

## Design System

### Paleta de Cores
- **Primary**: Azul (#3b82f6) - Confiança e tecnologia
- **Accent**: Verde (#10b981) - Crescimento e positividade
- **Muted**: Cinza claro - Backgrounds secundários
- Suporte completo a dark mode

### Componentes Principais
- `MetricCard` - Exibição de métricas com ícones e tendências
- `LessonPlanCard` - Card de plano de aula com ações
- `SentimentBadge` - Indicador visual de sentimento
- `StudentResponseCard` - Card expansível de feedback
- `EngagementChart` - Gráfico de barras com Recharts
- `ActivitySuggestionCard` - Sugestão de atividade com aceitação
- `LessonPlanGenerator` - Formulário multi-campo validado

### Acessibilidade
- Todos os elementos interativos têm `data-testid`
- Formulários com validação adequada
- Estados de loading claros
- Feedback visual (toasts) para todas as ações

## Próximos Passos Sugeridos

### Curto Prazo
1. Adicionar persistência com PostgreSQL
2. Implementar autenticação de professores
3. Exportação de relatórios em PDF
4. Histórico detalhado de métricas

### Médio Prazo
1. Integração com Google Classroom
2. Integração com Microsoft Teams
3. Analytics avançados com gráficos de tendência
4. Compartilhamento de planos entre professores

### Longo Prazo
1. Aplicativo mobile (React Native)
2. Recomendações personalizadas por perfil de turma
3. Biblioteca colaborativa de planos de aula
4. Dashboard administrativo para coordenadores

## Como Usar

1. **Criar Plano de Aula**:
   - Navegue para "Gerar Plano"
   - Preencha o formulário
   - Clique em "Gerar Plano de Aula"
   - Aguarde a IA processar (15-30 segundos)
   - O plano será salvo automaticamente

2. **Analisar Feedback**:
   - Navegue para "Feedback Emocional"
   - Clique em "Analisar Resposta"
   - Insira nome do aluno e resposta
   - Clique em "Analisar Sentimento"
   - Veja a classificação e confiança

3. **Gerar Sugestões**:
   - Navegue para "Engajamento"
   - Clique em "Gerar Novas Sugestões"
   - Receba 3 sugestões personalizadas
   - Aceite as que fizer sentido para sua turma

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Acessar aplicação
http://localhost:5000
```

## Tecnologias e Integrações
- **OpenAI**: javascript_openai blueprint integrado
- **Shadcn UI**: Sistema de componentes completo
- **React Query**: Cache e sincronização de dados
- **Recharts**: Visualizações de dados
- **date-fns**: Formatação de datas em português
- **Lucide React**: Ícones consistentes
