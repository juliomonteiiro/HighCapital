# HighCapital Chatbots - Frontend

## Melhorias Implementadas

### 🎨 Sistema de Temas
- **Tema Claro/Escuro**: Implementado sistema completo de alternância entre temas
- **Paleta de Cores Organizada**: Cores centralizadas em `src/styles/theme.ts`
- **Persistência**: Preferência de tema salva no localStorage
- **Design Consistente**: Todos os componentes adaptados para ambos os temas

### 🏠 Home Page Melhorada
- **Navbar Redesenhada**: Header mais limpo e organizado
- **Botão de Tema**: Alternância fácil entre tema claro/escuro
- **Cards Otimizados**: Removidas informações de mensagens e tokens
- **Layout Responsivo**: Grid adaptativo para diferentes tamanhos de tela
- **Componente Header Reutilizável**: Header padronizado para toda a aplicação

### 🎯 Componentes Atualizados
- **ChatbotCard**: Design mais limpo, sem métricas desnecessárias
- **Header**: Componente reutilizável com tema e navegação
- **ChatPage**: Interface adaptada para tema escuro
- **ThemeContext**: Gerenciamento centralizado de temas

### 🎨 Paleta de Cores

#### Tema Claro
- **Primário**: Azul (#1976d2)
- **Secundário**: Verde (#2e7d32)
- **Background**: Cinza claro (#f8f9fa)
- **Texto**: Preto (#1a1a1a)

#### Tema Escuro
- **Primário**: Azul claro (#90caf9)
- **Secundário**: Verde claro (#81c784)
- **Background**: Cinza escuro (#121212)
- **Texto**: Branco (#ffffff)

### 🚀 Funcionalidades
- ✅ Alternância de tema em tempo real
- ✅ Persistência da preferência do usuário
- ✅ Design responsivo
- ✅ Interface limpa e moderna
- ✅ Componentes reutilizáveis
- ✅ Navegação melhorada

### 📁 Estrutura de Arquivos
```
src/
├── contexts/
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx      # Novo: Gerenciamento de temas
├── components/
│   ├── common/
│   │   ├── Header.tsx        # Novo: Header reutilizável
│   │   └── ...
│   └── chatbot/
│       └── ChatbotCard.tsx   # Atualizado: Design melhorado
├── styles/
│   └── theme.ts              # Novo: Paleta de cores
├── pages/
│   ├── HomePage.tsx          # Atualizado: Nova navbar
│   └── ChatPage.tsx          # Atualizado: Tema escuro
└── App.tsx                   # Atualizado: ThemeProvider
```

### 🎯 Próximos Passos
- [ ] Implementar animações suaves
- [ ] Adicionar mais opções de personalização
- [ ] Melhorar acessibilidade
- [ ] Otimizar performance

### 🛠️ Tecnologias Utilizadas
- React 18
- TypeScript
- Material-UI (MUI)
- Styled Components
- React Router
- Context API
