# Componente NPS Vue para WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-BR.md)

Componente customizado de Net Promoter Score (NPS) desenvolvido em Vue.js para integração com a plataforma WeWeb.

## Funcionalidades

- **Tipos de Exibição**: Números (0-10, 1-5, etc.) ou Estrelas
- **Esquemas de Cores**: Colorido (gradiente vermelho→amarelo→verde) ou Neutro (cor única)
- **Escala Configurável**: Defina valores mínimos e máximos
- **Perguntas Dinâmicas**: Vincule perguntas adicionais do banco de dados/JSON
- **Fluxo Multi-step**: Avaliação → Perguntas Curtas → Texto Livre → Obrigado
- **Modo Footer Fixo**: Barra inferior fixa com minimizar/expandir
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

### Fonte de Dados das Perguntas

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `questions` | Array | `[]` | Array de objetos de pergunta do banco/JSON (bindable) |

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

### Modo Preview / Teste

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `previewMode` | OnOff | `false` | Habilita modo preview para testar todos os steps sem seguir o fluxo normal |
| `previewStep` | Number | `0` | Qual step exibir (0 = avaliação, 1+ = perguntas, último = agradecimento) |

**Funcionalidades do Modo Preview:**
- Barra visual "PREVIEW MODE" com controles de navegação
- Navegar entre todos os steps usando botões de seta
- Contador de steps mostrando posição atual (ex: "Step 2 / 4")
- Preenche automaticamente a nota com valor padrão (5) para testes
- **Importante:** Desabilite o modo preview antes de publicar em produção!

### Posição e Comportamento

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `positionMode` | TextSelect | `inline` | Posição: `inline` ou `fixed` (footer) |
| `showDelay` | Number | `0` | Delay antes de mostrar o NPS (ms) |
| `showCloseButton` | OnOff | `true` | Mostrar botão X para minimizar |
| `showBackButton` | OnOff | `true` | Mostrar botão voltar nos steps |
| `autoCloseDelay` | Number | `0` | Auto-minimizar após enviar (ms) |

### Barra Minimizada (Modo Footer Fixo)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `minimizedText` | Text | `Evaluate the platform` | Texto quando minimizado |
| `minimizedIcon` | TextSelect | `star` | Ícone: `star`, `chat`, `heart`, `thumbsUp`, `smile`, `none` |
| `minimizedPosition` | TextSelect | `center` | Alinhamento: `left`, `center`, `right` |
| `minimizedBackgroundColor` | Color | `#ffffff` | Cor de fundo |
| `minimizedTextColor` | Color | `#333333` | Cor do texto |
| `minimizedIconColor` | Color | `#1976D2` | Cor do ícone |

### Estilo Visual

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `backgroundColor` | Color | `#ffffff` | Cor de fundo do painel |
| `maxWidth` | Number | `1080` | Largura máxima em pixels |
| `primaryColor` | Color | `#1976D2` | Botões e destaques |
| `starColor` | Color | `#FFD700` | Cor de preenchimento das estrelas |
| `thankYouColor` | Color | `#43A047` | Cor do ícone de agradecimento |

### Step de Avaliação (Sempre Exibido)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `question` | Text | `How likely are you to recommend us?` | Pergunta de avaliação |
| `displayType` | TextSelect | `numbers` | Exibição: `numbers` ou `stars` |
| `colorScheme` | TextSelect | `colorful` | Esquema: `colorful` ou `neutral` |
| `minValue` | Number | `0` | Valor mínimo da escala |
| `maxValue` | Number | `10` | Valor máximo da escala |
| `buttonSize` | Number | `40` | Tamanho do botão/estrela em pixels |
| `showLabels` | OnOff | `true` | Mostrar labels baixo/alto |
| `lowLabel` | Text | `Not likely` | Label para nota baixa |
| `highLabel` | Text | `Very likely` | Label para nota alta |

### Textos dos Botões

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `submitButtonText` | Text | `Submit` | Texto do botão enviar |
| `nextButtonText` | Text | `Next` | Texto do botão próximo |
| `backButtonText` | Text | `Back` | Texto do botão voltar |

### Step de Agradecimento

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `thankYouTitle` | Text | `Thank you!` | Título |
| `thankYouMessage` | Text | `Your feedback helps us improve.` | Mensagem |

## Eventos para Workflows

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `ratingSelected` | `{ rating }` | Quando usuário seleciona uma nota no primeiro step (dispara imediatamente, útil para salvar a nota na hora) |
| `change` | `{ value }` | Quando usuário muda a seleção (qualquer mudança de valor) |
| `submit` | `{ rating, answers }` | Quando usuário completa o fluxo |
| `shown` | `{}` | Quando NPS é exibido |
| `minimized` | `{}` | Quando NPS é minimizado |
| `expanded` | `{}` | Quando NPS é expandido |
| `stepChanged` | `{ step, stepIndex }` | Quando step muda |

### Por que usar `ratingSelected` vs `submit`?

O evento `ratingSelected` dispara **imediatamente** quando o usuário clica em um número/estrela de avaliação, antes de clicar em "Próximo" ou "Enviar". Isso é útil para:

1. **Salvar a nota imediatamente** - Mesmo se o usuário abandonar a pesquisa, você já tem a nota dele
2. **Rastreamento de analytics** - Rastrear reações iniciais antes que perguntas adicionais influenciem a resposta
3. **Lógica condicional** - Mostrar perguntas diferentes baseadas na nota inicial

O evento `submit` dispara apenas quando o usuário completa todo o fluxo.

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

### Multi-step com Perguntas do Banco de Dados

1. Crie uma collection ou variável com as perguntas:
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
    "placeholder": "Digite aqui..."
  }
]
```

2. Vincule a propriedade `questions` à sua collection/variável

### Modo Footer Fixo

1. Configure `positionMode` para `fixed`
2. Configure a aparência da barra minimizada
3. Configure `autoCloseDelay` para auto-minimizar após enviar (ex: `3000` para 3 segundos)

### Testando com Modo Preview

1. Habilite o toggle `previewMode`
2. Use os controles de navegação para navegar por todos os steps
3. Ajuste `previewStep` para ir diretamente para um step específico
4. **Desabilite `previewMode` antes de publicar!**

Isso é útil para:
- Validar a aparência visual de cada step
- Testar layouts de perguntas antes de conectar ao banco de dados
- Revisão de QA sem precisar completar todo o fluxo

### Exemplo de Integração com Workflow

No evento `submit`:
1. Salvar resposta no banco de dados (rating + answers)
2. Mostrar toast de sucesso
3. Disparar evento de analytics

```javascript
// Exemplo workflow trigger: On Submit
// Action 1: Inserir na tabela Supabase "nps_responses"
// Dados: { rating: event.rating, answers: event.answers, created_at: now() }
```

## Detalhes dos Esquemas de Cores

### Colorful (Colorido) - Números
- 0-30%: Vermelho (#E53935) - Detratores
- 30-60%: Amarelo (#FDD835) - Neutros
- 60-100%: Verde (#43A047) - Promotores

### Neutral (Neutro) - Números
- Todos os botões: Cinza (#E0E0E0)
- Selecionado: Cor primária com efeito de escala
- Não selecionado: Opacidade reduzida

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
