# PRD - Componente NPS Flexível para WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](prd.en.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](prd.md)

**Projeto:** NPS Vue Component
**Versão:** 1.2
**Data:** 14/12/2025
**Status:** Produção

---

## 1. Visão Geral

### 1.1 Resumo Executivo

Desenvolvimento de um componente Net Promoter Score (NPS) customizável em Vue.js para integração com a plataforma WeWeb. O componente é utilizado primariamente na plataforma Moradigna para coletar feedback dos usuários após a geração de orçamentos de reforma residencial.

### 1.2 Problema

Atualmente não existe um componente NPS nativo no WeWeb que atenda às necessidades de:
- Fluxo multi-step (nota → feedback privado → avaliação pública)
- Customização visual completa (cores, formatos, layouts)
- Integração com workflows do WeWeb
- Experiência mobile-first

### 1.3 Solução

Criar um componente NPS flexível que permita:
- Configuração visual via painel do WeWeb
- Múltiplos estilos visuais (colorido, neutro, estrelas)
- Fluxo configurável de steps com perguntas dinâmicas do banco de dados/JSON
- Callbacks para integração com backend
- Estado colapsável/expansível
- Modo preview para testes

---

## 2. Contexto de Uso

### 2.1 Ambiente de Aplicação

**Plataforma:** Moradigna - Sistema de orçamentos para reformas residenciais
**Tela:** Resultado do orçamento
**Posição:** Rodapé fixo ou seção dedicada
**Trigger:** Após visualização do orçamento completo

### 2.2 User Flow Atual

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Seleção de Nota                                        │
│  "Quanto você recomendaria essa ferramenta aos seus amigos?"    │
│  [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]  [Próximo]        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Pergunta Curta (do banco de dados)                     │
│  "Qual o principal motivo da sua nota?"                         │
│  [Opção 1] [Opção 2] [Opção 3] [Opção 4]  [Próximo]             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Texto Livre (do banco de dados)                        │
│  "Gostaria de deixar algum comentário adicional?"               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Digite seu feedback aqui...                             │    │
│  └─────────────────────────────────────────────────────────┘    │
│  [Enviar]                                                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Agradecimento                                          │
│  "Obrigado pelo seu feedback!"                                  │
│  [Fechar]                                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Estados do Componente

| Estado | Descrição | Visual |
|--------|-----------|--------|
| `hidden` | Componente oculto | Apenas trigger "Avaliar a plataforma ☆" |
| `active` | Exibindo step atual | Container expandido |
| `selected` | Nota selecionada | Número destacado, outros esmaecidos |
| `submitted` | Aguardando próximo step | Loading ou transição |
| `completed` | Fluxo finalizado | Mensagem de agradecimento |
| `minimized` | Modo footer colapsado | Barra minimizada visível |

---

## 3. Requisitos Funcionais

### 3.1 Core Features (Implementadas ✅)

| ID | Requisito | Prioridade | Status |
|----|-----------|------------|--------|
| RF01 | Exibir escala NPS (0-10 ou range customizado) | Alta | ✅ |
| RF02 | Permitir seleção de apenas um valor | Alta | ✅ |
| RF03 | Emitir evento com valor selecionado | Alta | ✅ |
| RF04 | Suportar fluxo multi-step configurável | Alta | ✅ |
| RF05 | Exibir labels de extremos (ex: "Não indicaria" / "Indicaria") | Média | ✅ |
| RF06 | Campo de texto para feedback qualitativo | Alta | ✅ |
| RF07 | Botão de submit por step | Alta | ✅ |
| RF08 | Botão de fechar/dismiss | Alta | ✅ |
| RF09 | Estado colapsável (trigger no rodapé) | Média | ✅ |
| RF10 | Mensagem de agradecimento customizável | Baixa | ✅ |
| RF11 | Tipo de exibição com estrelas | Média | ✅ |
| RF12 | Perguntas dinâmicas do banco de dados/JSON | Alta | ✅ |
| RF13 | Modo preview para testes | Média | ✅ |
| RF14 | Navegação de voltar entre steps | Média | ✅ |
| RF15 | Evento imediato de nota (ratingSelected) | Alta | ✅ |
| RF16 | Ícone flutuante quando minimizado (inline mode) | Alta | ✅ |
| RF17 | Controle de visibilidade via workflow (isOpen) | Alta | ✅ |
| RF18 | Posição configurável do ícone flutuante | Média | ✅ |
| RF19 | Opção de ícone flutuante no modo fixed footer | Média | ✅ |

### 3.2 Configurabilidade

| ID | Propriedade | Tipo | Valores | Default |
|----|-------------|------|---------|---------|
| CF01 | `displayType` | enum | `numbers`, `stars` | `numbers` |
| CF02 | `colorScheme` | enum | `colorful`, `neutral` | `colorful` |
| CF03 | `minValue` | number | 0-10 | `0` |
| CF04 | `maxValue` | number | 1-10 | `10` |
| CF05 | `showLabels` | boolean | true/false | `true` |
| CF06 | `lowLabel` | string | - | "Não indicaria" |
| CF07 | `highLabel` | string | - | "Indicaria" |
| CF08 | `question` | string | - | "Quanto você recomendaria?" |
| CF09 | `questions` | array | Question[] | `[]` |
| CF10 | `primaryColor` | string | hex color | "#1976D2" |
| CF11 | `showCloseButton` | boolean | true/false | `true` |
| CF12 | `showBackButton` | boolean | true/false | `true` |
| CF13 | `positionMode` | enum | `inline`, `fixed` | `inline` |
| CF14 | `previewMode` | boolean | true/false | `false` |
| CF15 | `previewStep` | number | 0-n | `0` |
| CF16 | `autoCloseDelay` | number | ms | `0` |
| CF17 | `showDelay` | number | ms | `0` |
| CF18 | `isOpen` | boolean | true/false | `true` |
| CF19 | `minimizedStyle` | enum | `bar`, `floatingIcon` | `bar` |
| CF20 | `floatingIconHorizontal` | enum | `left`, `right` | `right` |
| CF21 | `floatingIconVertical` | enum | `top`, `bottom` | `bottom` |

### 3.3 Eventos/Callbacks

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `ratingSelected` | `{ rating: number }` | Quando usuário seleciona uma nota (dispara imediatamente) |
| `change` | `{ value: number }` | Quando usuário muda qualquer seleção |
| `submit` | `{ rating: number, answers: Answer[] }` | Quando usuário completa todo o fluxo |
| `shown` | `{}` | Quando NPS é exibido |
| `minimized` | `{}` | Quando NPS é minimizado |
| `expanded` | `{}` | Quando NPS é expandido |
| `stepChanged` | `{ step: string, stepIndex: number }` | Transição entre steps |

---

## 4. Especificações de UI/UX

### 4.1 Padrões Visuais de Escala

#### Colorful (Gradiente Semântico)
```
Score:    0    1    2    3    4    5    6    7    8    9    10
Color:   🔴   🔴   🔴   🟠   🟠   🟡   🟡   🟢   🟢   🟢   🟢
         ←── Detratores ──→ ←Neutros→ ←── Promotores ──→
```

**Paleta de Cores Colorful:**
| Range | Classificação | Cor | Hex |
|-------|---------------|-----|-----|
| 0-30% | Detrator | Vermelho | #E53935 |
| 30-60% | Neutro | Amarelo | #FDD835 |
| 60-100% | Promotor | Verde | #43A047 |

#### Neutral (Monocromático)
```
Score:    0    1    2    3    4    5    6    7    8    9    10
Color:   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜
         └── Todos cinza (#E0E0E0), selecionado em destaque (#1976D2) ──┘
```

#### Estrelas
```
Rating:   ☆    ☆    ☆    ☆    ☆
          1    2    3    4    5
          └── Contorno vazio, preenchida no hover/seleção (dourado #FFD700) ──┘
```

### 4.2 Estados Interativos

| Estado | Visual |
|--------|--------|
| Default | Cor base, sem sombra |
| Hover | Leve elevação (shadow), scale 1.1 |
| Selected | Cor intensa, sombra, outros esmaecidos (opacity 0.5) |
| Disabled | Opacity 0.3, cursor not-allowed |

### 4.3 Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| Desktop (>768px) | Layout inline, botões 40x40px padrão |
| Mobile (<768px) | Botões diminuem, layout adapta |
| Mobile Small (<375px) | Layout compacto, botões 36x36px |

---

## 5. Estrutura de Perguntas Dinâmicas

### 5.1 Definição de Tipos de Pergunta

```typescript
interface Question {
  type: 'shortQuestion' | 'freeText';
  question: string;
  options?: string[];  // Para shortQuestion
  placeholder?: string;  // Para freeText
}

interface Answer {
  type: string;
  question: string;
  answer: string;
}
```

### 5.2 Exemplo de Configuração (do banco de dados/JSON)

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

---

## 6. Arquitetura Técnica

### 6.1 Estrutura de Arquivos

```
nps_vue/
├── src/
│   └── wwElement.vue           # Componente principal WeWeb
├── docs/
│   ├── prd.md                  # PRD Português
│   └── prd.en.md               # PRD Inglês
├── ww-config.js                # Configuração WeWeb
├── package.json
├── README.md                   # Documentação em Inglês
└── README.pt-BR.md             # Documentação em Português
```

### 6.2 Integração WeWeb

```javascript
// ww-config.js
export default {
  editor: {
    label: {
      en: 'NPS Component',
      pt: 'Componente NPS'
    },
    icon: 'star'
  },
  properties: {
    displayType: { /* ... */ },
    colorScheme: { /* ... */ },
    questions: { /* array bindable */ },
    // ... 30+ propriedades configuráveis
  },
  triggerEvents: [
    { name: 'ratingSelected', label: 'Ao Selecionar Nota' },
    { name: 'change', label: 'Ao Mudar Valor' },
    { name: 'submit', label: 'Ao Enviar' },
    { name: 'shown', label: 'Ao Exibir' },
    { name: 'minimized', label: 'Ao Minimizar' },
    { name: 'expanded', label: 'Ao Expandir' },
    { name: 'stepChanged', label: 'Ao Mudar Step' }
  ]
}
```

---

## 7. Modo Preview

### 7.1 Funcionalidades

- Barra visual "PREVIEW MODE" com controles de navegação
- Navegar entre todos os steps usando botões de seta
- Contador de steps mostrando posição atual (ex: "Step 2 / 4")
- Preenche automaticamente a nota com valor padrão (5) para testes
- Útil para validar aparência visual antes de conectar ao banco de dados

### 7.2 Uso

1. Habilite o toggle `previewMode` no editor do WeWeb
2. Use os controles de navegação para navegar por todos os steps
3. Ajuste `previewStep` para ir diretamente para um step específico
4. **Importante:** Desabilite o modo preview antes de publicar em produção!

---

## 8. Métricas de Sucesso

### 8.1 KPIs do Componente

| Métrica | Meta | Medição |
|---------|------|---------|
| Taxa de resposta | >40% | Impressões / Submissões |
| Taxa de conclusão | >80% | Iniciados / Completos |
| Tempo de resposta | <15s | Start to submit |
| NPS Score médio | Baseline | Média dos scores |

### 8.2 Critérios de Aceite

- [x] Componente renderiza em <100ms
- [x] Funciona em Chrome, Safari, Firefox
- [x] Responsivo para mobile (320px+)
- [x] Acessível (navegação por teclado, ARIA labels)
- [x] Eventos disparam corretamente no WeWeb
- [x] Configurações do painel refletem no componente
- [x] Modo preview permite navegação entre steps
- [x] Perguntas dinâmicas carregam de array bindable

---

## 9. Roadmap

### Fase 1 - MVP ✅
- [x] Escala 0-10 funcional
- [x] Integração básica WeWeb
- [x] Fluxo multi-step
- [x] Estilo colorful

### Fase 2 - Customização ✅
- [x] Múltiplos esquemas de cores (colorful, neutral)
- [x] Tipo de exibição com estrelas
- [x] Labels customizáveis
- [x] Perguntas dinâmicas do banco de dados
- [x] Modo preview
- [x] Navegação de voltar
- [x] Evento imediato de nota

### Fase 2.5 - Controles Avançados ✅
- [x] Ícone flutuante quando minimizado no modo inline
- [x] Controle de visibilidade via workflow (isOpen bindable)
- [x] Posição configurável do ícone flutuante (left/right, top/bottom)
- [x] Opção de ícone flutuante ou barra no modo fixed footer

### Fase 3 - Avançado (Futuro)
- [ ] Animações de transição
- [ ] Integração analytics
- [ ] Suporte A/B testing
- [ ] Escala alternativa com emojis
- [ ] Lógica condicional de steps

---

## 10. Anexos

### 10.1 Screenshots de Referência

- `NPS-01.png` a `NPS-05.png`: Fluxo atual na Moradigna
- `NPS_Component.jpg`: Variações de escala (neutral vs colorful)
- `NPS_Form.jpg`: Layout completo com textarea
- `NPS_Oculto.png`: Estado collapsed com trigger
- `NPS_001.png` a `NPS_004.png`: Referências externas de estilos

### 10.2 Links Úteis

- [WeWeb Custom Components](https://docs.weweb.io/custom-components/)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [NPS Best Practices](https://www.netpromoter.com/)
- [Repositório GitHub](https://github.com/imdouglasoliveira/nps_vue_weweb)

---

**Última atualização:** 14/12/2025
