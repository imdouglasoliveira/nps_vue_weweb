export default {
  editor: {
    label: {
      en: "NPS Rating",
      pt: "Avaliação NPS",
    },
    icon: "star",
  },
  properties: {
    // ===========================================
    // QUESTIONS DATA SOURCE (from DB/JSON binding)
    // ===========================================
    questions: {
      label: {
        en: "Additional Questions (JSON/DB)",
        pt: "Perguntas Adicionais (JSON/DB)",
      },
      type: "Array",
      section: "settings",
      bindable: true,
      defaultValue: [],
      options: {
        item: {
          type: "Object",
          defaultValue: { type: "shortQuestion", question: "", options: [] },
        },
      },
    },

    // ===========================================
    // PREVIEW / TEST MODE
    // ===========================================
    previewMode: {
      label: {
        en: "Preview Mode (Testing)",
        pt: "Modo Preview (Teste)",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
    },
    previewStep: {
      label: {
        en: "Preview Step",
        pt: "Step de Preview",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
      hidden: (content) => !content.previewMode,
    },

    // ===========================================
    // VISIBILITY CONTROL
    // ===========================================
    isOpen: {
      label: {
        en: "Is Open (Controlled)",
        pt: "Está Aberto (Controlado)",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
      bindable: true,
    },

    // ===========================================
    // POSITION & BEHAVIOR
    // ===========================================
    positionMode: {
      label: {
        en: "Position Mode",
        pt: "Modo de Posição",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "inline", label: { en: "Inline", pt: "Inline" } },
          { value: "fixed", label: { en: "Fixed Footer", pt: "Footer Fixo" } },
        ],
      },
      defaultValue: "inline",
    },
    showDelay: {
      label: {
        en: "Show Delay (ms)",
        pt: "Delay para Exibir (ms)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
    },
    showCloseButton: {
      label: {
        en: "Show Close Button",
        pt: "Mostrar Botão Fechar",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    showBackButton: {
      label: {
        en: "Show Back Button",
        pt: "Mostrar Botão Voltar",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    autoCloseDelay: {
      label: {
        en: "Auto Minimize After Submit (ms)",
        pt: "Minimizar Após Enviar (ms)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
    },

    // ===========================================
    // MINIMIZED BAR
    // ===========================================
    minimizedText: {
      label: {
        en: "Minimized Text",
        pt: "Texto Minimizado",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Evaluate the platform",
      bindable: true,
    },
    minimizedIcon: {
      label: {
        en: "Minimized Icon",
        pt: "Ícone Minimizado",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "star", label: { en: "Star", pt: "Estrela" } },
          { value: "chat", label: { en: "Chat", pt: "Chat" } },
          { value: "heart", label: { en: "Heart", pt: "Coração" } },
          { value: "thumbsUp", label: { en: "Thumbs Up", pt: "Joinha" } },
          { value: "smile", label: { en: "Smile", pt: "Sorriso" } },
          { value: "none", label: { en: "None", pt: "Nenhum" } },
        ],
      },
      defaultValue: "star",
    },
    minimizedPosition: {
      label: {
        en: "Minimized Position",
        pt: "Posição Minimizado",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "left", label: { en: "Left", pt: "Esquerda" } },
          { value: "center", label: { en: "Center", pt: "Centro" } },
          { value: "right", label: { en: "Right", pt: "Direita" } },
        ],
      },
      defaultValue: "center",
    },
    minimizedBackgroundColor: {
      label: {
        en: "Minimized Background",
        pt: "Fundo Minimizado",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#ffffff",
      bindable: true,
    },
    minimizedTextColor: {
      label: {
        en: "Minimized Text Color",
        pt: "Cor Texto Minimizado",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#333333",
      bindable: true,
    },
    minimizedIconColor: {
      label: {
        en: "Minimized Icon Color",
        pt: "Cor Ícone Minimizado",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#1976D2",
      bindable: true,
    },
    minimizedStyle: {
      label: {
        en: "Minimized Style",
        pt: "Estilo Minimizado",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "bar", label: { en: "Bar", pt: "Barra" } },
          { value: "floatingIcon", label: { en: "Floating Icon", pt: "Ícone Flutuante" } },
        ],
      },
      defaultValue: "bar",
      hidden: (content) => content.positionMode !== 'fixed',
    },
    floatingIconHorizontal: {
      label: {
        en: "Floating Icon Horizontal",
        pt: "Ícone Flutuante Horizontal",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "right", label: { en: "Right", pt: "Direita" } },
          { value: "left", label: { en: "Left", pt: "Esquerda" } },
        ],
      },
      defaultValue: "right",
    },
    floatingIconVertical: {
      label: {
        en: "Floating Icon Vertical",
        pt: "Ícone Flutuante Vertical",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "bottom", label: { en: "Bottom", pt: "Inferior" } },
          { value: "top", label: { en: "Top", pt: "Superior" } },
        ],
      },
      defaultValue: "bottom",
    },

    // ===========================================
    // VISUAL STYLING
    // ===========================================
    backgroundColor: {
      label: {
        en: "Background Color",
        pt: "Cor de Fundo",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#ffffff",
      bindable: true,
    },
    maxWidth: {
      label: {
        en: "Max Width (px)",
        pt: "Largura Máxima (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 1080,
      bindable: true,
    },
    primaryColor: {
      label: {
        en: "Primary Color",
        pt: "Cor Primária",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#1976D2",
      bindable: true,
    },
    starColor: {
      label: {
        en: "Star Color",
        pt: "Cor da Estrela",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#FFD700",
      bindable: true,
    },
    thankYouColor: {
      label: {
        en: "Thank You Icon Color",
        pt: "Cor Ícone Agradecimento",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#43A047",
      bindable: true,
    },

    // ===========================================
    // RATING STEP (always shown)
    // ===========================================
    question: {
      label: {
        en: "Rating Question",
        pt: "Pergunta Avaliação",
      },
      type: "Text",
      section: "settings",
      defaultValue: "How likely are you to recommend us?",
      bindable: true,
    },
    displayType: {
      label: {
        en: "Display Type",
        pt: "Tipo de Exibição",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "numbers", label: { en: "Numbers", pt: "Números" } },
          { value: "stars", label: { en: "Stars", pt: "Estrelas" } },
        ],
      },
      defaultValue: "numbers",
    },
    colorScheme: {
      label: {
        en: "Color Scheme (Numbers)",
        pt: "Esquema de Cores (Números)",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "colorful", label: { en: "Colorful", pt: "Colorido" } },
          { value: "neutral", label: { en: "Neutral", pt: "Neutro" } },
        ],
      },
      defaultValue: "colorful",
    },
    minValue: {
      label: {
        en: "Min Value",
        pt: "Valor Mínimo",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
    },
    maxValue: {
      label: {
        en: "Max Value",
        pt: "Valor Máximo",
      },
      type: "Number",
      section: "settings",
      defaultValue: 10,
      bindable: true,
    },
    buttonSize: {
      label: {
        en: "Button/Star Size",
        pt: "Tamanho Botão/Estrela",
      },
      type: "Number",
      section: "settings",
      defaultValue: 40,
      bindable: true,
    },
    showLabels: {
      label: {
        en: "Show Labels",
        pt: "Mostrar Labels",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    lowLabel: {
      label: {
        en: "Low Label",
        pt: "Label Baixo",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Not likely",
      bindable: true,
    },
    highLabel: {
      label: {
        en: "High Label",
        pt: "Label Alto",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Very likely",
      bindable: true,
    },

    // ===========================================
    // BUTTON TEXTS
    // ===========================================
    submitButtonText: {
      label: {
        en: "Submit Button Text",
        pt: "Texto Botão Enviar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Submit",
      bindable: true,
    },
    nextButtonText: {
      label: {
        en: "Next Button Text",
        pt: "Texto Botão Próximo",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Next",
      bindable: true,
    },
    backButtonText: {
      label: {
        en: "Back Button Text",
        pt: "Texto Botão Voltar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Back",
      bindable: true,
    },

    // ===========================================
    // THANK YOU STEP
    // ===========================================
    thankYouTitle: {
      label: {
        en: "Thank You Title",
        pt: "Título Agradecimento",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Thank you!",
      bindable: true,
    },
    thankYouMessage: {
      label: {
        en: "Thank You Message",
        pt: "Mensagem Agradecimento",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Your feedback helps us improve.",
      bindable: true,
    },
  },
  triggerEvents: [
    {
      name: "ratingSelected",
      label: {
        en: "On Rating Selected",
        pt: "Ao Selecionar Nota",
      },
      event: {
        rating: 0,
      },
    },
    {
      name: "change",
      label: {
        en: "On Value Change",
        pt: "Ao Mudar Valor",
      },
      event: {
        value: 0,
      },
    },
    {
      name: "submit",
      label: {
        en: "On Submit",
        pt: "Ao Enviar",
      },
      event: {
        rating: 0,
        answers: [],
      },
    },
    {
      name: "shown",
      label: {
        en: "On NPS Shown",
        pt: "Ao Exibir NPS",
      },
      event: {},
    },
    {
      name: "minimized",
      label: {
        en: "On NPS Minimized",
        pt: "Ao Minimizar NPS",
      },
      event: {},
    },
    {
      name: "expanded",
      label: {
        en: "On NPS Expanded",
        pt: "Ao Expandir NPS",
      },
      event: {},
    },
    {
      name: "stepChanged",
      label: {
        en: "On Step Changed",
        pt: "Ao Mudar Step",
      },
      event: {
        step: "",
        stepIndex: 0,
      },
    },
  ],
};
