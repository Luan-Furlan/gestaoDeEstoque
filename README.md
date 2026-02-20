# Gestão de Estoque 📦

Sistema completo de gerenciamento de estoque com interface web moderna, desenvolvido com **React + Express.js**.

## 🎯 Funcionalidades

- ✅ **Autenticação segura** com JWT
- ✅ **Gerenciamento de produtos** (criar, editar, visualizar)
- ✅ **Upload de imagens** para produtos
- ✅ **Rastreamento de movimentações** de estoque
- ✅ **Dashboard** com visão geral do estoque
- ✅ **Interface responsiva** (Desktop e Mobile)
- ✅ **Modo escuro** integrado
- ✅ **API REST** completa

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **React Router** - Roteamento

### Backend
- **Express.js** - Framework web
- **JWT** - Autenticação
- **SQLite3** - Banco de dados
- **Multer** - Upload de arquivos

## 📋 Pré-requisitos

- **Node.js** 16+ e **npm**
- **Git**

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Luan-Furlan/gestaoDeEstoque.git
cd gestaoDeEstoque
```

### 2. Instale dependências do backend

```bash
cd backend
npm install
```

### 3. Instale dependências do frontend

```bash
cd ../frontend
npm install
```

## ▶️ Como executar

### Desenvolvimento Local

**Terminal 1 - Backend (porta 4000):**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend (porta 5173):**
```bash
cd frontend
npm run dev
```

Acesse: **http://localhost:5173**

### Produção

**Build do frontend:**
```bash
cd frontend
npm run build
```

**Iniciar backend em produção:**
```bash
cd backend
npm run build  # ou npm start
```

## 📁 Estrutura do Projeto

```
gestaoDeEstoque/
├── backend/
│   ├── src/
│   │   ├── db.js          # Configuração do banco de dados
│   │   └── index.js       # Servidor Express
│   ├── seed.js            # Script de seed inicial
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/         # Páginas (Dashboard, Products, Movements, Login)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── App.jsx        # Componente raiz
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔐 Autenticação

O sistema usa **JWT (JSON Web Tokens)** para autenticação:

1. Faça login na página de login
2. O token é armazenado em `localStorage`
3. Incluído automaticamente em todas as requisições

### Credenciais Padrão (após seed):
```
Email: admin@example.com
Senha: admin123
```

## 📱 APIs Disponíveis

### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/register` - Registrar usuário

### Produtos
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Editar produto
- `GET /api/products/:id` - Obter detalhes

### Movimentações
- `GET /api/movements` - Listar movimentações
- `POST /api/movements` - Registrar movimentação

## 🖼️ Imagens e Uploads

- Imagens de produtos são salvas em `backend/uploads/`
- Formato aceito: JPG, PNG, GIF
- Tamanho máximo: 5MB (configurável)

## 🌙 Modo Escuro

O tema escuro é automaticamente aplicado de acordo com a preferência do sistema. Alterne manualmente usando o botão na navbar.

## 📝 Seed Inicial

Para popular o banco com dados de teste:

```bash
cd backend
node seed.js
```

## 🚀 Deploy na Vercel

Veja a [Guia de Deploy na Vercel](#deploy-vercel) abaixo.

## 🐛 Troubleshooting

### Erro: "Cannot GET /api/products"
- Verifique se o backend está rodando na porta 4000
- Confirme que o token JWT é válido

### Erro: "Request failed with status 401"
- Faça logout e login novamente
- Limpe o localStorage: `localStorage.clear()`

### Erro: "Image not loading"
- Verifique se o caminho da imagem está correto
- Confirme que `backend/uploads/` existe

## 📄 Licença

Projeto de código aberto. Sinta-se livre para usar e modificar.

## 👨‍💻 Autor

**Luan Furlan** - [@Luan-Furlan](https://github.com/Luan-Furlan)

---

## Deploy Vercel

### 📦 Preparação

1. **Gere uma build do frontend:**
```bash
cd frontend
npm run build
```

2. **Commit all changes:**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 🚀 Deploy Automático

**Opção 1: Vercel CLI (Recomendado)**

```bash
# Instale globalmente
npm install -g vercel

# Na raiz do projeto, faça deploy
vercel
```

**Opção 2: Dashboard Vercel (GitHub)**

1. Acesse https://vercel.com
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Configure:
   - **Framework**: React
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://seu-backend.com
     ```
5. Clique em "Deploy"

### ⚙️ Configuração do Backend

**Para Heroku/Railway/Render:**

1. Configure a variável de ambiente `NODE_ENV=production`
2. Use um banco de dados em nuvem (PostgreSQL recomendado)
3. Obtenha a URL do seu backend (ex: `https://seu-backend-api.com`)
4. Atualize no frontend a URL da API

**Arquivo `.env` (frontend):**
```env
VITE_API_URL=https://seu-backend-api.com
```

### ✅ Verificar Deploy

Após o deploy:
- Acesse a URL gerada pela Vercel
- Teste o login
- Verifique se as imagens carregam
- Teste CRUD de produtos

### 📊 Monitoramento

No dashboard da Vercel você pode:
- Ver logs de build e runtime
- Rastrear performance
- Ativar analytics
- Gerenciar variáveis de ambiente

---

**Sucesso! Seu projeto está online! 🎉**
