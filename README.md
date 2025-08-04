# 🤖 HighCapital - Chatbot com Inteligência Artificial

Uma aplicação web completa para criação e interação com chatbots personalizados utilizando inteligência artificial através da API do OpenAI.

## 📋 Visão Geral

O HighCapital é uma plataforma que permite aos usuários criar chatbots personalizados com contextos específicos e interagir com eles através de uma interface web moderna e intuitiva. A aplicação utiliza a API do OpenAI para gerar respostas inteligentes e mantém um histórico completo das conversas.

### ✨ Funcionalidades Principais

- 🔐 **Sistema de Autenticação**: Registro e login de usuários com JWT
- 🤖 **Criação de Chatbots**: Interface para criar chatbots personalizados com contexto específico
- 💬 **Chat em Tempo Real**: Interação com chatbots através de interface de chat moderna
- 📊 **Dashboard**: Visualização de estatísticas e gerenciamento de chatbots
- 📱 **Interface Responsiva**: Design moderno com Material-UI
- 🔄 **Histórico de Conversas**: Armazenamento e visualização de todas as mensagens
- ⚙️ **Configurações Avançadas**: Controle de temperatura, modelo de IA e tokens

## 🏗️ Arquitetura

### Backend (.NET 9.0)
- **Clean Architecture** com separação clara de responsabilidades
- **Entity Framework Core** com PostgreSQL
- **JWT Authentication** para segurança
- **OpenAI Integration** para geração de respostas
- **Swagger/OpenAPI** para documentação da API
- **Testes Unitários** com xUnit e Moq

### Frontend (React 19 + TypeScript)
- **React 19** com TypeScript
- **Vite** para build e desenvolvimento
- **Material-UI (MUI)** para componentes de interface
- **React Router** para navegação
- **Axios** para comunicação com API
- **Context API** para gerenciamento de estado

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 9.0**
- **Entity Framework Core**
- **PostgreSQL**
- **JWT Bearer Authentication**
- **OpenAI API**
- **Swagger/OpenAPI**
- **xUnit** (Testes)
- **Moq** (Mocking)

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Material-UI (MUI)**
- **React Router DOM**
- **Axios**
- **React Markdown**
- **Emotion** (Styled Components)

## 📦 Estrutura do Projeto

```
HighCapital/
├── backend/
│   ├── HighCapital.Domain/          # Entidades e interfaces
│   ├── HighCapital.Application/     # Casos de uso e serviços
│   ├── HighCapital.Infrastructure/  # Implementações e banco de dados
│   ├── HighCapital.Web/            # API Controllers e configurações
│   └── HighCapital.Tests/          # Testes unitários
└── frontend/
    ├── src/
    │   ├── assets/                 # Imagens da aplicação
    │   ├── components/             # Componentes React
    │   ├── pages/                  # Páginas da aplicação
    │   ├── services/               # Serviços de API
    │   ├── contexts/               # Contextos React
    │   ├── hooks/                  # Custom hooks
    │   └── types/                  # Definições TypeScript
    └── public/                     # Arquivos estáticos
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **.NET 9.0 SDK**
- **Node.js 18+**
- **PostgreSQL 12+**
- **Chave da API OpenAI**

### 1. Clone o Repositório
```bash
git clone <https://github.com/juliomonteiiro/HighCapital.git>
cd HighCapital
```

### 2. Configuração do Backend

#### 2.1 Configurar Banco de Dados
1. Crie um banco PostgreSQL:
```sql
CREATE DATABASE high_capital_db;
```

2. Configure a connection string em `backend/HighCapital.Web/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=high_capital_db;Username=seu_usuario;Password=sua_senha"
  }
}
```

#### 2.2 Configurar OpenAI API
Adicione sua chave da API OpenAI em `backend/HighCapital.Web/appsettings.json`:
```json
{
  "OpenAI": {
    "ApiKey": "sua_chave_openai_aqui"
  }
}
```

#### 2.3 Executar Migrações
```bash
cd backend/HighCapital.Web
dotnet ef database update
```

#### 2.4 Executar o Backend
```bash
cd backend/HighCapital.Web
dotnet run
```

O backend estará disponível em: `http://localhost:5211`
Documentação da API: `http://localhost:5211/swagger`

### 3. Configuração do Frontend

#### 3.1 Instalar Dependências
```bash
cd frontend
npm install
```

#### 3.2 Configurar Variáveis de Ambiente
Crie um arquivo `.env` na pasta `frontend/` com as seguintes variáveis:

```bash
# API Configuration
VITE_API_URL=http://localhost:5211/api
```

**Importante**: O arquivo `.env` já está configurado no `.gitignore` para não ser commitado no repositório.

#### 3.3 Configurar URL da API (Alternativo)
Se preferir configurar diretamente no código, edite `frontend/src/services/api.ts` e configure a URL base da API:
```typescript
const API_BASE_URL = 'http://localhost:5211/api';
```

#### 3.4 Executar o Frontend
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 📚 Como Usar

### 1. Registro e Login
- Acesse a aplicação e crie uma conta
- Faça login com suas credenciais

### 2. Criar um Chatbot
- Na página inicial, clique em "Criar Chatbot"
- Preencha:
  - **Nome**: Nome do seu chatbot
  - **Descrição**: Descrição opcional
  - **Contexto**: Instruções específicas para o comportamento do bot
  - **Modelo**: Escolha entre GPT-4, GPT-3.5, etc.
  - **Temperatura**: Controla a criatividade das respostas (0.0 - 2.0)
  - **Max Tokens**: Limite de tokens por resposta

### 3. Interagir com o Chatbot
- Clique no chatbot criado para iniciar uma conversa
- Digite suas mensagens no campo de texto
- O chatbot responderá baseado no contexto definido
- Visualize o histórico completo da conversa

### 4. Gerenciar Chatbots
- Acesse o dashboard para ver estatísticas
- Edite ou exclua chatbots existentes
- Visualize métricas de uso

## 🔧 Configurações Avançadas

### Variáveis de Ambiente (Backend)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "sua_connection_string"
  },
  "Jwt": {
    "Key": "sua_chave_jwt_secreta",
    "Issuer": "HighCapital",
    "Audience": "HighCapitalUsers",
    "ExpirationInMinutes": 120
  },
  "OpenAI": {
    "ApiKey": "sua_chave_openai"
  }
}
```

### Configurações do Frontend
- **Tema**: Suporte a tema claro/escuro
- **Responsividade**: Interface adaptável para mobile
- **Cache**: Armazenamento local de tokens de autenticação

## 🧪 Testes

### Executar Testes do Backend
```bash
cd backend/HighCapital.Tests
dotnet test
```

### Executar Testes com Coverage
```bash
dotnet test --collect:"XPlat Code Coverage"
```

## 📊 Funcionalidades Implementadas

### ✅ Backend
- [x] Autenticação JWT
- [x] CRUD de Usuários
- [x] CRUD de Chatbots
- [x] Sistema de Mensagens
- [x] Integração OpenAI
- [x] Entity Framework Core
- [x] Migrações de Banco
- [x] Testes Unitários
- [x] Documentação Swagger
- [x] Middleware de Erro
- [x] CORS Configurado

### ✅ Frontend
- [x] Interface de Login/Registro
- [x] Dashboard de Chatbots
- [x] Interface de Chat
- [x] Formulário de Criação de Chatbot
- [x] Perfil de Usuário
- [x] Tema Claro/Escuro
- [x] Loading States
- [x] Tratamento de Erros
- [x] Responsividade
- [x] Markdown Support

## 🔒 Segurança

- **JWT Authentication** para proteção de rotas
- **Hash de Senhas** com BCrypt
- **Validação de Dados** em todas as entradas
- **CORS** configurado adequadamente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Desenvolvedor** - [Julio Monteiro](https://github.com/juliomonteiiro)
---

**HighCapital** - Transformando conversas em experiências inteligentes! 🚀 