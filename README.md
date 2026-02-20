# Gestão de Estoque — Projeto Portfólio

Projeto full‑stack minimal para demonstração (Frontend React + Backend Node/Express + SQLite).

## Como rodar localmente (desenvolvimento)

Pré-requisitos: Node.js (16+)

### Rodar tudo com 1 comando (recomendado)
- No root do repositório execute:
  - `npm install` (instala dependências do root)
  - `npm run install-all` (instala `backend` e `frontend`)
  - `npm run dev` — inicia backend + frontend em paralelo (usa `concurrently`)
- Alternativa Windows PowerShell: `.\start-dev.ps1` (faz install e inicia ambos)

### Backend — API (porta 4000)
1. Abra um terminal na pasta `backend`
   - `npm install`
   - `npm run seed` (popula banco com usuários de teste)
   - `npm run dev`
   - API disponível em `http://localhost:4000`

   Usuários seed: `admin` / `admin123` (role: admin) e `user` / `user123` (role: user)

### Frontend — React + Tailwind (porta Vite padrão 5173)
1. Abra outro terminal na pasta `frontend`
   - `npm install`
   - `npm run dev`
   - App disponível em `http://localhost:5173` (ou porta do Vite)

## Funcionalidades implementadas (MVP)
- Autenticação (JWT)
- CRUD básico de produtos (API + UI list) com upload de imagem
- Movimentações (registro simples)
- UI em React with Tailwind CSS e suporte a dark mode
- Seed de dados e scripts de inicialização

---

Se quiser, eu continuo adicionando: formulários de CRUD completos, upload de imagens, testes automatizados e CI. Qual próximo passo deseja que eu implemente agora?