# NPS Vue Component for WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-BR.md)

Custom Net Promoter Score (NPS) component built with Vue.js for integration with the WeWeb platform.

## Features

- **Rating Styles**: Numbers (0-10, 1-5, etc.), Stars, or Emojis
- **Emoji Sets**: Pre-defined sets (Faces, Thumbs, Hearts) with 5 or 11 scale options
- **Friendly Header**: Optional header with emoji (e.g., "Hi there! Quick question:")
- **Color Modes**: Colorful (gradient red-yellow-green) or Neutral (single color)
- **Configurable Scale**: Set min and max values
- **Dynamic Questions**: Bind additional questions from database/JSON
- **Multi-step Flow**: Rating - Short Questions - Free Text - Thank You
- **Fixed Footer Mode**: Sticky bottom bar with minimize/expand
- **Floating Icon Mode**: Configurable floating button when minimized
- **Visibility Control**: Control NPS display via workflow (bindable property)
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

### Rating Display

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `displayType` | TextSelect | `numbers` | Rating style: `numbers`, `stars`, or `emojis` |
| `layout` | TextSelect | `default` | Layout: `default` (full-width) or `compact` (floating card) |
| `question` | Text | `How likely are you to recommend us?` | Main question |
| `colorScheme` | TextSelect | `colorful` | Color mode: `colorful` or `neutral` (numbers only) |
| `minValue` | Number | `0` | Scale min (numbers/stars only) |
| `maxValue` | Number | `10` | Scale max (numbers/stars only) |
| `buttonSize` | Number | `40` | Element size in pixels (numbers/stars only) |
| `showLabels` | OnOff | `true` | Show scale labels |
| `lowLabel` | Text | `Not likely` | Min label |
| `highLabel` | Text | `Very likely` | Max label |

### Emoji Settings (when displayType = emojis)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `emojiScale` | TextSelect | `5` | Scale: `5` (0-4) or `11` (0-10) emojis |
| `emojiSet` | TextSelect | `faces` | Style: `faces`, `thumbs`, or `hearts` |

**Available Emoji Sets:**

| Set | 5-Scale | 11-Scale |
|-----|---------|----------|
| **Faces** | 😩 😟 🤔 🙂 😁 | 😡 😠 😩 😟 😕 😐 🙂 😊 😄 😁 🤩 |
| **Thumbs** | 👎 👎 😐 👍 👍 | 👎 👎 👎 👎 👎 😐 👍 👍 👍 👍 👍 |
| **Hearts** | 💔 🖤 🤍 💛 ❤️ | 💔 💔 🖤 🖤 🤍 🤍 💛 💛 🧡 ❤️ ❤️‍🔥 |

### Compact Card Settings (when layout = compact)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `compactPosition` | TextSelect | `bottom-left` | Position: `bottom-left` or `bottom-right` |
| `compactWidth` | Number | `340` | Card width in pixels |

**Compact Mode Features:**
- Works with all rating types: Numbers, Stars, and Emojis
- Floating card with customizable width and position
- Auto-submit on emoji click (emojis only, when no additional questions)
- Responsive layout that adapts to different screen sizes
- Ideal for quick feedback without full-width footers

### Header

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showConversationalHeader` | OnOff | `false` | Show friendly header |
| `headerEmoji` | Text | `👋` | Header emoji |
| `headerText` | Text | `Hi there! Quick question:` | Header text |

### Position & Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `positionMode` | TextSelect | `inline` | Display mode: `inline` or `fixed` (footer) |
| `showDelay` | Number | `0` | Delay before showing (ms) |
| `autoCloseDelay` | Number | `0` | Auto-close after submit (ms) |
| `showCloseButton` | OnOff | `true` | Show close button |
| `showBackButton` | OnOff | `true` | Show back button |

### Minimized State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `minimizedStyle` | TextSelect | `bar` | Collapsed style: `bar` or `floatingIcon` (fixed mode only) |
| `minimizedText` | Text | `Evaluate the platform` | Button text (bar mode) |
| `minimizedIcon` | TextSelect | `star` | Icon: `star`, `chat`, `heart`, `thumbsUp`, `smile`, `none` |
| `minimizedPosition` | TextSelect | `center` | Alignment: `left`, `center`, `right` (bar mode) |
| `minimizedBackgroundColor` | Color | `#ffffff` | Background |
| `minimizedTextColor` | Color | `#333333` | Text color (bar mode) |
| `minimizedIconColor` | Color | `#1976D2` | Icon color |

### Floating Icon

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `floatingIconHorizontal` | TextSelect | `right` | Horizontal: `left` or `right` |
| `floatingIconVertical` | TextSelect | `bottom` | Vertical: `top` or `bottom` |

### Visual Style

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | Color | `#ffffff` | Panel background |
| `maxWidth` | Number | `1080` | Max width in pixels |
| `primaryColor` | Color | `#1976D2` | Accent color |
| `starColor` | Color | `#FFD700` | Star color (stars only) |
| `thankYouColor` | Color | `#43A047` | Thank you icon color |

### Button Texts

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `submitButtonText` | Text | `Submit` | Submit button |
| `nextButtonText` | Text | `Next` | Next button |
| `backButtonText` | Text | `Back` | Back button |

### Thank You Step

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `thankYouTitle` | Text | `Thank you!` | Title |
| `thankYouMessage` | Text | `Your feedback helps us improve.` | Message |

### Data Source

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `questions` | Array | `[]` | Questions from database/JSON (bindable) |

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

### Visibility Control

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isOpen` | OnOff | `true` | Visible (bindable) |
| `previewMode` | OnOff | `false` | Preview mode for testing |
| `previewStep` | Number | `0` | Step to display in preview |

## Workflow Events

| Event | Payload | Description |
|-------|---------|-------------|
| `ratingSelected` | `{ rating }` | When user selects a rating (fires immediately) |
| `change` | `{ value }` | When user changes any selection |
| `submit` | `{ rating, answers }` | When user completes the flow |
| `shown` | `{}` | When NPS is displayed |
| `minimized` | `{}` | When NPS is minimized |
| `expanded` | `{}` | When NPS is expanded |
| `stepChanged` | `{ step, stepIndex }` | When step changes |

### Why Use `ratingSelected` vs `submit`?

The `ratingSelected` event fires **immediately** when a user clicks on a rating, before they click "Next" or "Submit". This is useful for:

1. **Saving the rating immediately** - Even if the user abandons the survey
2. **Analytics tracking** - Track initial reactions
3. **Conditional logic** - Show different questions based on the rating

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

### Emoji Rating (Compact Card)

1. Set `displayType` to `emojis`
2. Set `layout` to `compact`
3. Choose `emojiScale`: `5` (simple) or `11` (detailed)
4. Choose `emojiSet`: `faces`, `thumbs`, or `hearts`

### Compact Card Mode (Any Rating Type)

1. Set `layout` to `compact`
2. Configure `compactPosition` and `compactWidth`
3. Works with Numbers, Stars, or Emojis

### Multi-step with Database Questions

1. Create a collection or variable with questions
2. Bind the `questions` property to your collection/variable

### Fixed Footer Mode

1. Set `positionMode` to `fixed`
2. Choose `minimizedStyle`: `bar` or `floatingIcon`
3. Configure appearance
4. Set `autoCloseDelay` for auto-minimize after submit

### Controlling Visibility via Workflow

1. Create a variable `showNPS` (boolean) in WeWeb
2. Bind `isOpen` property to your variable
3. Control visibility through workflow actions

## Color Scheme Details

### Colorful (Numbers)
- 0-30%: Red (#E53935) - Detractors
- 30-60%: Yellow (#FDD835) - Passives
- 60-100%: Green (#43A047) - Promoters

### Neutral (Numbers)
- All buttons: Gray (#E0E0E0)
- Selected: Primary color with scale effect

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
