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
    // 1. RATING DISPLAY
    // ===========================================
    displayType: {
      label: {
        en: "Rating Style",
        pt: "Estilo de Avaliação",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "numbers", label: { en: "Numbers", pt: "Números" } },
          { value: "stars", label: { en: "Stars", pt: "Estrelas" } },
          { value: "emojis", label: { en: "Emojis", pt: "Emojis" } },
        ],
      },
      defaultValue: "numbers",
    },
    question: {
      label: {
        en: "Question",
        pt: "Pergunta",
      },
      type: "Text",
      section: "settings",
      defaultValue: "How likely are you to recommend us?",
      bindable: true,
    },
    colorScheme: {
      label: {
        en: "Color Mode",
        pt: "Modo de Cores",
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
      hidden: (content) => content.displayType !== "numbers",
    },
    minValue: {
      label: {
        en: "Scale Min",
        pt: "Escala Mín",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
      hidden: (content) => content.displayType === "emojis",
    },
    maxValue: {
      label: {
        en: "Scale Max",
        pt: "Escala Máx",
      },
      type: "Number",
      section: "settings",
      defaultValue: 10,
      bindable: true,
      hidden: (content) => content.displayType === "emojis",
    },
    buttonSize: {
      label: {
        en: "Size (px)",
        pt: "Tamanho (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 40,
      bindable: true,
      hidden: (content) => content.displayType === "emojis",
    },
    showLabels: {
      label: {
        en: "Scale Labels",
        pt: "Legendas da Escala",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    lowLabel: {
      label: {
        en: "Min Label",
        pt: "Legenda Mín",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Not likely",
      bindable: true,
      hidden: (content) => !content.showLabels,
    },
    highLabel: {
      label: {
        en: "Max Label",
        pt: "Legenda Máx",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Very likely",
      bindable: true,
      hidden: (content) => !content.showLabels,
    },

    // ===========================================
    // 2. EMOJI SETTINGS
    // ===========================================
    emojiScale: {
      label: {
        en: "Scale",
        pt: "Escala",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "5", label: { en: "5 emojis (0-4)", pt: "5 emojis (0-4)" } },
          { value: "11", label: { en: "11 emojis (0-10)", pt: "11 emojis (0-10)" } },
        ],
      },
      defaultValue: "5",
      hidden: (content) => content.displayType !== "emojis",
    },
    emojiSet: {
      label: {
        en: "Style",
        pt: "Estilo",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "faces", label: { en: "Faces (😩😟🤔🙂😁)", pt: "Faces (😩😟🤔🙂😁)" } },
          { value: "thumbs", label: { en: "Thumbs (👎😐👍)", pt: "Polegares (👎😐👍)" } },
          { value: "hearts", label: { en: "Hearts (💔🤍❤️)", pt: "Corações (💔🤍❤️)" } },
        ],
      },
      defaultValue: "faces",
      hidden: (content) => content.displayType !== "emojis",
    },
    emojiLayout: {
      label: {
        en: "Layout",
        pt: "Layout",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "compact", label: { en: "Compact Card", pt: "Card Compacto" } },
          { value: "default", label: { en: "Full Width", pt: "Largura Total" } },
        ],
      },
      defaultValue: "compact",
      hidden: (content) => content.displayType !== "emojis",
    },
    compactPosition: {
      label: {
        en: "Position",
        pt: "Posição",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "bottom-left", label: { en: "Bottom Left", pt: "Inferior Esquerdo" } },
          { value: "bottom-right", label: { en: "Bottom Right", pt: "Inferior Direito" } },
        ],
      },
      defaultValue: "bottom-left",
      hidden: (content) => content.displayType !== "emojis" || content.emojiLayout !== "compact",
    },
    compactWidth: {
      label: {
        en: "Width (px)",
        pt: "Largura (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 340,
      hidden: (content) => content.displayType !== "emojis" || content.emojiLayout !== "compact",
    },

    // ===========================================
    // 3. HEADER
    // ===========================================
    showConversationalHeader: {
      label: {
        en: "Friendly Header",
        pt: "Header Amigável",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
    },
    headerEmoji: {
      label: {
        en: "Emoji",
        pt: "Emoji",
      },
      type: "Text",
      section: "settings",
      defaultValue: "👋",
      hidden: (content) => !content.showConversationalHeader,
    },
    headerText: {
      label: {
        en: "Text",
        pt: "Texto",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Hi there! Quick question:",
      bindable: true,
      hidden: (content) => !content.showConversationalHeader,
    },

    // ===========================================
    // 4. POSITION & BEHAVIOR
    // ===========================================
    positionMode: {
      label: {
        en: "Display Mode",
        pt: "Modo de Exibição",
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
        en: "Delay (ms)",
        pt: "Delay (ms)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
    },
    autoCloseDelay: {
      label: {
        en: "Auto-close (ms)",
        pt: "Auto-fechar (ms)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
    },
    showCloseButton: {
      label: {
        en: "Close Button",
        pt: "Botão Fechar",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    showBackButton: {
      label: {
        en: "Back Button",
        pt: "Botão Voltar",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },

    // ===========================================
    // 5. MINIMIZED STATE
    // ===========================================
    minimizedStyle: {
      label: {
        en: "Collapsed Style",
        pt: "Estilo Recolhido",
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
      hidden: (content) => content.positionMode !== "fixed",
    },
    minimizedText: {
      label: {
        en: "Button Text",
        pt: "Texto do Botão",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Evaluate the platform",
      bindable: true,
      hidden: (content) => content.minimizedStyle === "floatingIcon",
    },
    minimizedIcon: {
      label: {
        en: "Icon",
        pt: "Ícone",
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
        en: "Alignment",
        pt: "Alinhamento",
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
      hidden: (content) => content.minimizedStyle === "floatingIcon",
    },
    minimizedBackgroundColor: {
      label: {
        en: "Background",
        pt: "Fundo",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#ffffff",
      bindable: true,
    },
    minimizedTextColor: {
      label: {
        en: "Text Color",
        pt: "Cor do Texto",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#333333",
      bindable: true,
      hidden: (content) => content.minimizedStyle === "floatingIcon",
    },
    minimizedIconColor: {
      label: {
        en: "Icon Color",
        pt: "Cor do Ícone",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#1976D2",
      bindable: true,
    },

    // ===========================================
    // 6. FLOATING ICON
    // ===========================================
    floatingIconHorizontal: {
      label: {
        en: "Horizontal",
        pt: "Horizontal",
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
        en: "Vertical",
        pt: "Vertical",
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
    // 7. VISUAL STYLE
    // ===========================================
    backgroundColor: {
      label: {
        en: "Background",
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
        pt: "Largura Máx (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 1080,
      bindable: true,
      hidden: (content) => content.displayType === "emojis" && content.emojiLayout === "compact",
    },
    primaryColor: {
      label: {
        en: "Accent Color",
        pt: "Cor de Destaque",
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
      hidden: (content) => content.displayType !== "stars",
    },
    thankYouColor: {
      label: {
        en: "Icon Color",
        pt: "Cor do Ícone",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#43A047",
      bindable: true,
    },

    // ===========================================
    // 8. BUTTON TEXTS
    // ===========================================
    submitButtonText: {
      label: {
        en: "Submit",
        pt: "Enviar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Submit",
      bindable: true,
    },
    nextButtonText: {
      label: {
        en: "Next",
        pt: "Próximo",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Next",
      bindable: true,
    },
    backButtonText: {
      label: {
        en: "Back",
        pt: "Voltar",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Back",
      bindable: true,
    },

    // ===========================================
    // 9. THANK YOU STEP
    // ===========================================
    thankYouTitle: {
      label: {
        en: "Title",
        pt: "Título",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Thank you!",
      bindable: true,
    },
    thankYouMessage: {
      label: {
        en: "Message",
        pt: "Mensagem",
      },
      type: "Text",
      section: "settings",
      defaultValue: "Your feedback helps us improve.",
      bindable: true,
    },

    // ===========================================
    // 10. DATA SOURCE
    // ===========================================
    questions: {
      label: {
        en: "Questions (JSON/DB)",
        pt: "Perguntas (JSON/DB)",
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
    // 11. VISIBILITY CONTROL
    // ===========================================
    isOpen: {
      label: {
        en: "Visible",
        pt: "Visível",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
      bindable: true,
    },
    previewMode: {
      label: {
        en: "Preview Mode",
        pt: "Modo Preview",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
    },
    previewStep: {
      label: {
        en: "Step",
        pt: "Step",
      },
      type: "Number",
      section: "settings",
      defaultValue: 0,
      bindable: true,
      hidden: (content) => !content.previewMode,
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
