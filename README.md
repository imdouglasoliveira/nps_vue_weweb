# NPS Vue Component for WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-BR.md)

Custom Net Promoter Score (NPS) component built with Vue.js for integration with the WeWeb platform.

## Features

- **Display Types**: Numbers (0-10, 1-5, etc.), Stars, or Emojis
- **Emoji Sets**: Pre-defined sets (Faces, Thumbs, Hearts) with 5 or 11 scale options
- **Conversational Header**: Optional friendly header with emoji (👋 Hi there! Quick question:)
- **Color Schemes**: Colorful (gradient red→yellow→green) or Neutral (single color)
- **Configurable Scale**: Set min and max values
- **Dynamic Questions**: Bind additional questions from database/JSON
- **Multi-step Flow**: Rating → Short Questions → Free Text → Thank You
- **Fixed Footer Mode**: Sticky bottom bar with minimize/expand
- **Floating Icon Mode**: Configurable floating button when minimized
- **Visibility Control**: Control NPS display via workflow (isOpen bindable property)
- **Back Navigation**: Allow users to go back and change answers
- **Workflow Events**: Full integration with WeWeb workflows

## Installation

```bash
npm install
npm run serve    # Development (port 8080)
npm run build    # Production build
```

## Project Structure

```
nps_vue/
├── src/
│   └── wwElement.vue         # Main WeWeb component
├── ww-config.js              # WeWeb configuration
└── package.json
```

## Configuration Properties

### Questions Data Source

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `questions` | Array | `[]` | Array of question objects from database/JSON (bindable) |

**Question object structure:**
```json
[
  {
    "type": "shortQuestion",
    "question": "What is the main reason for your score?",
    "options": ["Product quality", "Customer service", "Price", "Ease of use", "Other"]
  },
  {
    "type": "freeText",
    "question": "Any additional feedback?",
    "placeholder": "Type your feedback here..."
  }
]
```

### Preview / Test Mode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `previewMode` | OnOff | `false` | Enable preview mode to test all steps without following the normal flow |
| `previewStep` | Number | `0` | Which step to display (0 = rating, 1+ = questions, last = thank you) |

**Preview Mode Features:**
- Visual "PREVIEW MODE" indicator bar with navigation controls
- Navigate between all steps using arrow buttons
- Step counter showing current position (e.g., "Step 2 / 4")
- Auto-fills rating with a default value (5) for testing
- **Important:** Disable preview mode before publishing to production!

### Visibility Control

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | OnOff | `true` | Control NPS visibility via workflow (bindable) |

**Usage:** Bind this property to a WeWeb variable to control when the NPS is shown. Useful for:
- Showing NPS only once per user action
- Hiding NPS after submission
- Conditional display based on user state

### Position & Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `positionMode` | TextSelect | `inline` | Position: `inline` or `fixed` (footer) |
| `showDelay` | Number | `0` | Delay before showing NPS (ms) |
| `showCloseButton` | OnOff | `true` | Show X button to minimize |
| `showBackButton` | OnOff | `true` | Show back button on steps |
| `autoCloseDelay` | Number | `0` | Auto-minimize after submit (ms) |

### Minimized Bar / Floating Icon

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minimizedStyle` | TextSelect | `bar` | Style when minimized: `bar` or `floatingIcon` (only for fixed mode) |
| `minimizedText` | Text | `Evaluate the platform` | Text shown when minimized (bar mode) |
| `minimizedIcon` | TextSelect | `star` | Icon: `star`, `chat`, `heart`, `thumbsUp`, `smile`, `none` |
| `minimizedPosition` | TextSelect | `center` | Alignment: `left`, `center`, `right` (bar mode) |
| `minimizedBackgroundColor` | Color | `#ffffff` | Background color |
| `minimizedTextColor` | Color | `#333333` | Text color |
| `minimizedIconColor` | Color | `#1976D2` | Icon color |
| `floatingIconHorizontal` | TextSelect | `right` | Floating icon horizontal position: `left` or `right` |
| `floatingIconVertical` | TextSelect | `bottom` | Floating icon vertical position: `top` or `bottom` |

**Note:** In `inline` mode, the floating icon is always shown when minimized. In `fixed` mode, you can choose between a bar or floating icon style.

### Visual Styling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | Color | `#ffffff` | Panel background color |
| `maxWidth` | Number | `1080` | Max width in pixels |
| `primaryColor` | Color | `#1976D2` | Buttons and highlights |
| `starColor` | Color | `#FFD700` | Star fill color |
| `thankYouColor` | Color | `#43A047` | Thank you icon color |

### Rating Step (Always Shown)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `question` | Text | `How likely are you to recommend us?` | Rating question |
| `displayType` | TextSelect | `numbers` | Display: `numbers`, `stars`, or `emojis` |
| `colorScheme` | TextSelect | `colorful` | Scheme: `colorful` or `neutral` (for numbers/stars) |
| `minValue` | Number | `0` | Minimum scale value (for numbers/stars) |
| `maxValue` | Number | `10` | Maximum scale value (for numbers/stars) |
| `buttonSize` | Number | `40` | Button/star size in pixels |
| `showLabels` | OnOff | `true` | Show low/high labels |
| `lowLabel` | Text | `Not likely` | Low score label |
| `highLabel` | Text | `Very likely` | High score label |

### Emoji Settings (when displayType = emojis)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `emojiScale` | TextSelect | `5` | Scale: `5` (0-4) or `11` (0-10) emojis |
| `emojiSet` | TextSelect | `faces` | Set: `faces`, `thumbs`, or `hearts` |

**Available Emoji Sets:**

| Set | 5-Scale | 11-Scale |
|-----|---------|----------|
| **Faces** | 😩 😟 🤔 🙂 😁 | 😡 😠 😩 😟 😕 😐 🙂 😊 😄 😁 🤩 |
| **Thumbs** | 👎 👎 😐 👍 👍 | 👎 👎 👎 👎 👎 😐 👍 👍 👍 👍 👍 |
| **Hearts** | 💔 🖤 🤍 💛 ❤️ | 💔 💔 🖤 🖤 🤍 🤍 💛 💛 🧡 ❤️ ❤️‍🔥 |

### Conversational Header

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showConversationalHeader` | OnOff | `false` | Show friendly header with emoji |
| `headerEmoji` | Text | `👋` | Emoji shown in header |
| `headerText` | Text | `Hi there! Quick question:` | Text shown in header |

### Button Texts

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `submitButtonText` | Text | `Submit` | Submit button text |
| `nextButtonText` | Text | `Next` | Next button text |
| `backButtonText` | Text | `Back` | Back button text |

### Thank You Step

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `thankYouTitle` | Text | `Thank you!` | Title |
| `thankYouMessage` | Text | `Your feedback helps us improve.` | Message |

## Workflow Events

| Event | Payload | Description |
|-------|---------|-------------|
| `ratingSelected` | `{ rating }` | When user selects a rating on first step (fires immediately, useful for saving the rating right away) |
| `change` | `{ value }` | When user changes selection (any value change) |
| `submit` | `{ rating, answers }` | When user completes the flow |
| `shown` | `{}` | When NPS is displayed |
| `minimized` | `{}` | When NPS is minimized |
| `expanded` | `{}` | When NPS is expanded |
| `stepChanged` | `{ step, stepIndex }` | When step changes |

### Why Use `ratingSelected` vs `submit`?

The `ratingSelected` event fires **immediately** when a user clicks on a rating number/star, before they click "Next" or "Submit". This is useful for:

1. **Saving the rating immediately** - Even if the user abandons the survey, you have their rating
2. **Analytics tracking** - Track initial reactions before additional questions influence the response
3. **Conditional logic** - Show different questions based on the initial rating

The `submit` event fires only when the user completes the entire flow.

### Submit Event Payload Example

```javascript
{
  rating: 8,
  answers: [
    {
      type: "shortQuestion",
      question: "What is the main reason for your score?",
      answer: "Product quality"
    },
    {
      type: "freeText",
      question: "Any additional feedback?",
      answer: "Great service!"
    }
  ]
}
```

## Usage Examples

### Basic NPS (0-10 Colorful Numbers)

1. Add component to page
2. Set `displayType` to `numbers`
3. Set `colorScheme` to `colorful`
4. Leave `questions` empty for rating-only

### Star Rating (1-5)

1. Set `displayType` to `stars`
2. Set `minValue` to `1`
3. Set `maxValue` to `5`

### Emoji Rating (Terminus-style)

1. Set `displayType` to `emojis`
2. Choose `emojiScale`: `5` (simple) or `11` (detailed)
3. Choose `emojiSet`: `faces`, `thumbs`, or `hearts`
4. Optionally enable `showConversationalHeader` for a friendly header

### Multi-step with Database Questions

1. Create a collection or variable with questions:
```json
[
  {
    "type": "shortQuestion",
    "question": "What is the main reason for your score?",
    "options": ["Product quality", "Customer service", "Price", "Ease of use", "Other"]
  },
  {
    "type": "freeText",
    "question": "Any additional feedback?",
    "placeholder": "Type here..."
  }
]
```

2. Bind the `questions` property to your collection/variable

### Fixed Footer Mode

1. Set `positionMode` to `fixed`
2. Choose `minimizedStyle`: `bar` (default) or `floatingIcon`
3. Configure minimized bar/icon appearance
4. Set `autoCloseDelay` to auto-minimize after submit (e.g., `3000` for 3 seconds)

### Floating Icon Position

1. Set `floatingIconHorizontal` to `left` or `right`
2. Set `floatingIconVertical` to `top` or `bottom`
3. Customize colors with `minimizedBackgroundColor` and `minimizedIconColor`

### Controlling Visibility via Workflow

1. Create a variable `showNPS` (boolean) in WeWeb
2. Bind `isOpen` property to your `showNPS` variable
3. In workflow:
   - Check if user already responded (query database)
   - If already responded: set `showNPS = false`
   - If not responded: set `showNPS = true`
4. On `submit` event: save response and set `showNPS = false`

### Testing with Preview Mode

1. Enable `previewMode` toggle
2. Use the navigation controls to browse through all steps
3. Adjust `previewStep` to jump directly to a specific step
4. **Disable `previewMode` before publishing!**

This is useful for:
- Validating the visual appearance of each step
- Testing question layouts before connecting to a database
- QA review without needing to complete the full flow

### Workflow Integration Example

On `submit` event:
1. Save response to database (rating + answers)
2. Show success toast
3. Trigger analytics event

```javascript
// Example workflow trigger: On Submit
// Action 1: Insert to Supabase table "nps_responses"
// Data: { rating: event.rating, answers: event.answers, created_at: now() }
```

## Color Scheme Details

### Colorful (Numbers)
- 0-30%: Red (#E53935) - Detractors
- 30-60%: Yellow (#FDD835) - Passives
- 60-100%: Green (#43A047) - Promoters

### Neutral (Numbers)
- All buttons: Gray (#E0E0E0)
- Selected: Primary color with scale effect
- Unselected: Dimmed opacity

### Stars
- Empty: Gray outline (#BDBDBD)
- Filled: Star color (default gold #FFD700)
- Hover: Preview fill effect

## How to Use in WeWeb

1. Run `npm run build` to generate the build
2. Publish to GitHub
3. In WeWeb Dashboard: **Coded components** > **Import element**
4. Select repository and branch
5. Set active version
6. In Editor: **Add panel** > **Coded components** > Drag to page

## License

MIT
