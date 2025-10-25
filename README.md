# EduCoPilot 🎓

Co-Piloto Educacional - Assistente IA para Professores com Google Gemini AI

## 🚀 Demonstração

- **Frontend (GitHub Pages):** https://kremervini.github.io/educopilot/
- **Backend (Render):** https://educopilot-backend.onrender.com

## 📝 Descrição

EduCoPilot é uma plataforma educacional que utiliza IA (Google Gemini) para auxiliar professores em:

- 📚 Geração de planos de aula personalizados
- 💭 Análise de sentimento de feedback dos alunos
- 🎯 Sugestões de atividades pedagógicas
- 📊 Visualização de métricas de engajamento

## 🛠️ Tecnologias

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- TanStack Query

### Backend
- Node.js + Express
- Google Gemini AI API
- TypeScript

## 🔧 Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/KremerVini/educopilot.git
cd educopilot
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Adicione sua GEMINI_API_KEY no arquivo .env
```

4. Execute em modo de desenvolvimento:
```bash
npm run dev
```

## 📦 Deploy

O projeto está configurado para deploy automático:

- **Frontend**: GitHub Pages (via GitHub Actions)
- **Backend**: Render.com (auto-deploy na branch main)

## 📄 Licença

MIT

---

Desenvolvido com ❤️ usando Google Gemini AI