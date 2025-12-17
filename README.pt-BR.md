# Componente NPS Vue para WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-BR.md)

Componente customizado de Net Promoter Score (NPS) desenvolvido em Vue.js para integração com a plataforma WeWeb.

## Funcionalidades

- **Estilos de Avaliação**: Números (0-10, 1-5, etc.), Estrelas ou Emojis
- **Sets de Emojis**: Sets pré-definidos (Faces, Polegares, Corações) com escalas de 5 ou 11 opções
- **Header Amigável**: Header opcional com emoji (ex: "Olá! Pergunta rápida:")
- **Modos de Cores**: Colorido (gradiente vermelho-amarelo-verde) ou Neutro (cor única)
- **Escala Configurável**: Defina valores mínimos e máximos
- **Perguntas Dinâmicas**: Vincule perguntas adicionais do banco de dados/JSON
- **Fluxo Multi-step**: Avaliação - Perguntas Curtas - Texto Livre - Obrigado
- **Modo Footer Fixo**: Barra inferior fixa com minimizar/expandir
- **Modo Ícone Flutuante**: Botão flutuante configurável quando minimizado
- **Controle de Visibilidade**: Controle a exibição do NPS via workflow (propriedade bindable)
- **Navegação Voltar**: Permite usuários voltarem e alterarem respostas
- **Eventos Workflow**: Integração completa com workflows do WeWeb

## Instalação

```bash
npm install
npm run serve    # Desenvolvimento (porta 8080)
npm run build    # Build de produção
```

## Estrutura do Projeto

```
nps_vue/
├── src/
│   └── wwElement.vue         # Componente principal WeWeb
├── ww-config.js              # Configuração WeWeb
└── package.json
```

## Propriedades de Configuração

### Exibição da Avaliação

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `displayType` | TextSelect | `numbers` | Estilo: `numbers`, `stars` ou `emojis` |
| `question` | Text | `How likely are you to recommend us?` | Pergunta principal |
| `colorScheme` | TextSelect | `colorful` | Modo de cores: `colorful` ou `neutral` (apenas números) |
| `minValue` | Number | `0` | Escala mín (números/estrelas) |
| `maxValue` | Number | `10` | Escala máx (números/estrelas) |
| `buttonSize` | Number | `40` | Tamanho em pixels (números/estrelas) |
| `showLabels` | OnOff | `true` | Mostrar legendas |
| `lowLabel` | Text | `Not likely` | Legenda mín |
| `highLabel` | Text | `Very likely` | Legenda máx |

### Configurações de Emoji (quando displayType = emojis)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `emojiScale` | TextSelect | `5` | Escala: `5` (0-4) ou `11` (0-10) emojis |
| `emojiSet` | TextSelect | `faces` | Estilo: `faces`, `thumbs` ou `hearts` |
| `emojiLayout` | TextSelect | `compact` | Layout: `compact` (card flutuante) ou `default` (largura total) |
| `compactPosition` | TextSelect | `bottom-left` | Posição: `bottom-left` ou `bottom-right` |
| `compactWidth` | Number | `340` | Largura em pixels |

**Funcionalidades do Modo Compacto:**
- Card flutuante com largura e posição customizáveis
- Auto-submit ao clicar no emoji (sem botão Submit quando não há perguntas adicionais)
- Layout alinhado à esquerda com design limpo
- Ideal para feedback rápido sem footers full-width

**Sets de Emojis Disponíveis:**

| Set | Escala 5 | Escala 11 |
|-----|----------|-----------|
| **Faces** | 😩 😟 🤔 🙂 😁 | 😡 😠 😩 😟 😕 😐 🙂 😊 😄 😁 🤩 |
| **Thumbs** | 👎 👎 😐 👍 👍 | 👎 👎 👎 👎 👎 😐 👍 👍 👍 👍 👍 |
| **Hearts** | 💔 🖤 🤍 💛 ❤️ | 💔 💔 🖤 🖤 🤍 🤍 💛 💛 🧡 ❤️ ❤️‍🔥 |

### Header

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `showConversationalHeader` | OnOff | `false` | Mostrar header amigável |
| `headerEmoji` | Text | `👋` | Emoji do header |
| `headerText` | Text | `Hi there! Quick question:` | Texto do header |

### Posição e Comportamento

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `positionMode` | TextSelect | `inline` | Modo: `inline` ou `fixed` (footer) |
| `showDelay` | Number | `0` | Delay para exibir (ms) |
| `autoCloseDelay` | Number | `0` | Auto-fechar após enviar (ms) |
| `showCloseButton` | OnOff | `true` | Botão fechar |
| `showBackButton` | OnOff | `true` | Botão voltar |

### Estado Minimizado

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `minimizedStyle` | TextSelect | `bar` | Estilo: `bar` ou `floatingIcon` (apenas modo fixed) |
| `minimizedText` | Text | `Evaluate the platform` | Texto do botão (modo barra) |
| `minimizedIcon` | TextSelect | `star` | Ícone: `star`, `chat`, `heart`, `thumbsUp`, `smile`, `none` |
| `minimizedPosition` | TextSelect | `center` | Alinhamento: `left`, `center`, `right` (modo barra) |
| `minimizedBackgroundColor` | Color | `#ffffff` | Fundo |
| `minimizedTextColor` | Color | `#333333` | Cor do texto (modo barra) |
| `minimizedIconColor` | Color | `#1976D2` | Cor do ícone |

### Ícone Flutuante

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `floatingIconHorizontal` | TextSelect | `right` | Horizontal: `left` ou `right` |
| `floatingIconVertical` | TextSelect | `bottom` | Vertical: `top` ou `bottom` |

### Estilo Visual

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `backgroundColor` | Color | `#ffffff` | Cor de fundo do painel |
| `maxWidth` | Number | `1080` | Largura máxima em pixels |
| `primaryColor` | Color | `#1976D2` | Cor de destaque |
| `starColor` | Color | `#FFD700` | Cor da estrela (apenas estrelas) |
| `thankYouColor` | Color | `#43A047` | Cor do ícone de agradecimento |

### Textos dos Botões

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `submitButtonText` | Text | `Submit` | Botão enviar |
| `nextButtonText` | Text | `Next` | Botão próximo |
| `backButtonText` | Text | `Back` | Botão voltar |

### Tela de Agradecimento

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `thankYouTitle` | Text | `Thank you!` | Título |
| `thankYouMessage` | Text | `Your feedback helps us improve.` | Mensagem |

### Fonte de Dados

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `questions` | Array | `[]` | Perguntas do banco/JSON (bindable) |

**Estrutura do objeto pergunta:**
```json
[
  {
    "type": "shortQuestion",
    "question": "Qual o principal motivo da sua nota?",
    "options": ["Qualidade do produto", "Atendimento", "Preço", "Facilidade de uso", "Outro"]
  },
  {
    "type": "freeText",
    "question": "Gostaria de deixar algum comentário adicional?",
    "placeholder": "Digite seu feedback aqui..."
  }
]
```

### Controle de Visibilidade

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `isOpen` | OnOff | `true` | Visível (bindable) |
| `previewMode` | OnOff | `false` | Modo preview para testes |
| `previewStep` | Number | `0` | Step a exibir no preview |

## Eventos para Workflows

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `ratingSelected` | `{ rating }` | Quando usuário seleciona nota (dispara imediatamente) |
| `change` | `{ value }` | Quando usuário muda qualquer seleção |
| `submit` | `{ rating, answers }` | Quando usuário completa o fluxo |
| `shown` | `{}` | Quando NPS é exibido |
| `minimized` | `{}` | Quando NPS é minimizado |
| `expanded` | `{}` | Quando NPS é expandido |
| `stepChanged` | `{ step, stepIndex }` | Quando step muda |

### Por que usar `ratingSelected` vs `submit`?

O evento `ratingSelected` dispara **imediatamente** quando o usuário clica em uma avaliação, antes de clicar em "Próximo" ou "Enviar". Útil para:

1. **Salvar a nota imediatamente** - Mesmo se o usuário abandonar a pesquisa
2. **Rastreamento de analytics** - Rastrear reações iniciais
3. **Lógica condicional** - Mostrar perguntas diferentes baseadas na nota

### Exemplo de Payload do Evento Submit

```javascript
{
  rating: 8,
  answers: [
    {
      type: "shortQuestion",
      question: "Qual o principal motivo da sua nota?",
      answer: "Qualidade do produto"
    },
    {
      type: "freeText",
      question: "Gostaria de deixar algum comentário adicional?",
      answer: "Ótimo serviço!"
    }
  ]
}
```

## Exemplos de Uso

### NPS Básico (0-10 Colorido com Números)

1. Adicione o componente na página
2. Configure `displayType` para `numbers`
3. Configure `colorScheme` para `colorful`
4. Deixe `questions` vazio para apenas avaliação

### Avaliação com Estrelas (1-5)

1. Configure `displayType` para `stars`
2. Configure `minValue` para `1`
3. Configure `maxValue` para `5`

### Avaliação com Emojis (Card Compacto)

1. Configure `displayType` para `emojis`
2. Escolha `emojiScale`: `5` (simples) ou `11` (detalhada)
3. Escolha `emojiSet`: `faces`, `thumbs` ou `hearts`
4. `emojiLayout` já vem como `compact` por padrão (card flutuante)

### Multi-step com Perguntas do Banco de Dados

1. Crie uma collection ou variável com as perguntas
2. Vincule a propriedade `questions` à sua collection/variável

### Modo Footer Fixo

1. Configure `positionMode` para `fixed`
2. Escolha `minimizedStyle`: `bar` ou `floatingIcon`
3. Configure a aparência
4. Configure `autoCloseDelay` para auto-minimizar após enviar

### Controlando Visibilidade via Workflow

1. Crie uma variável `showNPS` (boolean) no WeWeb
2. Vincule a propriedade `isOpen` à sua variável
3. Controle a visibilidade através de ações do workflow

## Detalhes dos Modos de Cores

### Colorido (Números)
- 0-30%: Vermelho (#E53935) - Detratores
- 30-60%: Amarelo (#FDD835) - Neutros
- 60-100%: Verde (#43A047) - Promotores

### Neutro (Números)
- Todos os botões: Cinza (#E0E0E0)
- Selecionado: Cor primária com efeito de escala

### Estrelas
- Vazia: Contorno cinza (#BDBDBD)
- Preenchida: Cor da estrela (padrão dourado #FFD700)
- Hover: Efeito de preview do preenchimento

## Como Usar no WeWeb

1. Execute `npm run build` para gerar o build
2. Publique no GitHub
3. No Dashboard do WeWeb: **Coded components** > **Import element**
4. Selecione o repositório e branch
5. Defina a versão ativa
6. No Editor: **Add panel** > **Coded components** > Arraste para a página

## Licença

MIT
