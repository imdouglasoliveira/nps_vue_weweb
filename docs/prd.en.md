# PRD - Flexible NPS Component for WeWeb

[![en](https://img.shields.io/badge/lang-en-blue.svg)](prd.en.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](prd.md)

**Project:** NPS Vue Component
**Version:** 1.2
**Date:** December 14, 2025
**Status:** Production Ready

---

## 1. Overview

### 1.1 Executive Summary

Development of a customizable Net Promoter Score (NPS) component in Vue.js for integration with the WeWeb platform. The component is primarily designed for the Moradigna platform to collect user feedback after generating residential renovation budgets.

### 1.2 Problem

There is currently no native NPS component in WeWeb that meets the needs of:
- Multi-step flow (rating → private feedback → public review)
- Full visual customization (colors, formats, layouts)
- Integration with WeWeb workflows
- Mobile-first experience

### 1.3 Solution

Create a flexible NPS component that allows:
- Visual configuration via WeWeb panel
- Multiple visual styles (colorful, neutral, stars)
- Configurable step flow with dynamic questions from database/JSON
- Callbacks for backend integration
- Collapsible/expandable state
- Preview mode for testing

---

## 2. Usage Context

### 2.1 Application Environment

**Platform:** Moradigna - Residential renovation budget system
**Screen:** Budget result
**Position:** Fixed footer or dedicated section
**Trigger:** After viewing the complete budget

### 2.2 Current User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Rating Selection                                       │
│  "How likely are you to recommend us to friends?"               │
│  [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]  [Next]           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Short Question (from database)                         │
│  "What was the main reason for your rating?"                    │
│  [Option 1] [Option 2] [Option 3] [Option 4]  [Next]            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Free Text (from database)                              │
│  "Any additional feedback?"                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Type your feedback here...                              │    │
│  └─────────────────────────────────────────────────────────┘    │
│  [Submit]                                                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Thank You                                              │
│  "Thank you for your feedback!"                                 │
│  [Close]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Component States

| State | Description | Visual |
|-------|-------------|--------|
| `hidden` | Component hidden | Only trigger "Evaluate the platform ☆" |
| `active` | Displaying current step | Expanded container |
| `selected` | Rating selected | Highlighted number, others faded |
| `submitted` | Waiting for next step | Loading or transition |
| `completed` | Flow finished | Thank you message |
| `minimized` | Footer mode collapsed | Minimized bar visible |

---

## 3. Functional Requirements

### 3.1 Core Features (Implemented ✅)

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| RF01 | Display NPS scale (0-10 or custom range) | High | ✅ |
| RF02 | Allow single value selection | High | ✅ |
| RF03 | Emit event with selected value | High | ✅ |
| RF04 | Support configurable multi-step flow | High | ✅ |
| RF05 | Display extreme labels (e.g., "Not likely" / "Very likely") | Medium | ✅ |
| RF06 | Text field for qualitative feedback | High | ✅ |
| RF07 | Submit button per step | High | ✅ |
| RF08 | Close/dismiss button | High | ✅ |
| RF09 | Collapsible state (footer trigger) | Medium | ✅ |
| RF10 | Customizable thank you message | Low | ✅ |
| RF11 | Stars display type | Medium | ✅ |
| RF12 | Dynamic questions from database/JSON | High | ✅ |
| RF13 | Preview mode for testing | Medium | ✅ |
| RF14 | Back navigation between steps | Medium | ✅ |
| RF15 | Immediate rating event (ratingSelected) | High | ✅ |
| RF16 | Floating icon when minimized (inline mode) | High | ✅ |
| RF17 | Visibility control via workflow (isOpen) | High | ✅ |
| RF18 | Configurable floating icon position | Medium | ✅ |
| RF19 | Floating icon option in fixed footer mode | Medium | ✅ |

### 3.2 Configurability

| ID | Property | Type | Values | Default |
|----|----------|------|--------|---------|
| CF01 | `displayType` | enum | `numbers`, `stars` | `numbers` |
| CF02 | `colorScheme` | enum | `colorful`, `neutral` | `colorful` |
| CF03 | `minValue` | number | 0-10 | `0` |
| CF04 | `maxValue` | number | 1-10 | `10` |
| CF05 | `showLabels` | boolean | true/false | `true` |
| CF06 | `lowLabel` | string | - | "Not likely" |
| CF07 | `highLabel` | string | - | "Very likely" |
| CF08 | `question` | string | - | "How likely are you to recommend us?" |
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

### 3.3 Events/Callbacks

| Event | Payload | Description |
|-------|---------|-------------|
| `ratingSelected` | `{ rating: number }` | When user selects a rating (fires immediately) |
| `change` | `{ value: number }` | When user changes any selection |
| `submit` | `{ rating: number, answers: Answer[] }` | When user completes the entire flow |
| `shown` | `{}` | When NPS is displayed |
| `minimized` | `{}` | When NPS is minimized |
| `expanded` | `{}` | When NPS is expanded |
| `stepChanged` | `{ step: string, stepIndex: number }` | Transition between steps |

---

## 4. UI/UX Specifications

### 4.1 Scale Visual Patterns

#### Colorful (Semantic Gradient)
```
Score:    0    1    2    3    4    5    6    7    8    9    10
Color:   🔴   🔴   🔴   🟠   🟠   🟡   🟡   🟢   🟢   🟢   🟢
         ←── Detractors ──→ ←Passives→ ←── Promoters ──→
```

**Colorful Color Palette:**
| Range | Classification | Color | Hex |
|-------|---------------|-------|-----|
| 0-30% | Detractor | Red | #E53935 |
| 30-60% | Passive | Yellow | #FDD835 |
| 60-100% | Promoter | Green | #43A047 |

#### Neutral (Monochromatic)
```
Score:    0    1    2    3    4    5    6    7    8    9    10
Color:   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜   ⬜
         └── All gray (#E0E0E0), selected highlighted (#1976D2) ──┘
```

#### Stars
```
Rating:   ☆    ☆    ☆    ☆    ☆
          1    2    3    4    5
          └── Empty outline, filled on hover/select (gold #FFD700) ──┘
```

### 4.2 Interactive States

| State | Visual |
|-------|--------|
| Default | Base color, no shadow |
| Hover | Slight elevation (shadow), scale 1.1 |
| Selected | Intense color, shadow, others faded (opacity 0.5) |
| Disabled | Opacity 0.3, cursor not-allowed |

### 4.3 Responsiveness

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>768px) | Inline layout, buttons 40x40px default |
| Mobile (<768px) | Buttons scale down, layout adapts |
| Mobile Small (<375px) | Compact layout, buttons 36x36px |

---

## 5. Dynamic Questions Structure

### 5.1 Question Type Definition

```typescript
interface Question {
  type: 'shortQuestion' | 'freeText';
  question: string;
  options?: string[];  // For shortQuestion
  placeholder?: string;  // For freeText
}

interface Answer {
  type: string;
  question: string;
  answer: string;
}
```

### 5.2 Example Configuration (from database/JSON)

```json
[
  {
    "type": "shortQuestion",
    "question": "What was the main reason for your rating?",
    "options": ["Product quality", "Customer service", "Price", "Ease of use", "Other"]
  },
  {
    "type": "freeText",
    "question": "Any additional feedback?",
    "placeholder": "Type your feedback here..."
  }
]
```

---

## 6. Technical Architecture

### 6.1 File Structure

```
nps_vue/
├── src/
│   └── wwElement.vue           # Main WeWeb component
├── docs/
│   ├── prd.md                  # PRD Portuguese
│   └── prd.en.md               # PRD English
├── ww-config.js                # WeWeb configuration
├── package.json
├── README.md                   # English documentation
└── README.pt-BR.md             # Portuguese documentation
```

### 6.2 WeWeb Integration

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
    questions: { /* bindable array */ },
    // ... 30+ configurable properties
  },
  triggerEvents: [
    { name: 'ratingSelected', label: 'On Rating Selected' },
    { name: 'change', label: 'On Value Change' },
    { name: 'submit', label: 'On Submit' },
    { name: 'shown', label: 'On Shown' },
    { name: 'minimized', label: 'On Minimized' },
    { name: 'expanded', label: 'On Expanded' },
    { name: 'stepChanged', label: 'On Step Changed' }
  ]
}
```

---

## 7. Preview Mode

### 7.1 Features

- Visual "PREVIEW MODE" indicator bar with navigation controls
- Navigate between all steps using arrow buttons
- Step counter showing current position (e.g., "Step 2 / 4")
- Auto-fills rating with a default value (5) for testing
- Useful for validating visual appearance before connecting to database

### 7.2 Usage

1. Enable `previewMode` toggle in WeWeb editor
2. Use navigation controls to browse all steps
3. Adjust `previewStep` to jump directly to a specific step
4. **Important:** Disable preview mode before publishing to production

---

## 8. Success Metrics

### 8.1 Component KPIs

| Metric | Goal | Measurement |
|--------|------|-------------|
| Response rate | >40% | Impressions / Submissions |
| Completion rate | >80% | Started / Completed |
| Response time | <15s | Start to submit |
| Average NPS Score | Baseline | Average of scores |

### 8.2 Acceptance Criteria

- [x] Component renders in <100ms
- [x] Works in Chrome, Safari, Firefox
- [x] Responsive for mobile (320px+)
- [x] Accessible (keyboard navigation, ARIA labels)
- [x] Events fire correctly in WeWeb
- [x] Panel configurations reflect in component
- [x] Preview mode allows step navigation
- [x] Dynamic questions load from bindable array

---

## 9. Roadmap

### Phase 1 - MVP ✅
- [x] Functional 0-10 scale
- [x] Basic WeWeb integration
- [x] Multi-step flow
- [x] Colorful style

### Phase 2 - Customization ✅
- [x] Multiple color schemes (colorful, neutral)
- [x] Stars display type
- [x] Customizable labels
- [x] Dynamic questions from database
- [x] Preview mode
- [x] Back navigation
- [x] Immediate rating event

### Phase 2.5 - Advanced Controls ✅
- [x] Floating icon when minimized in inline mode
- [x] Visibility control via workflow (isOpen bindable)
- [x] Configurable floating icon position (left/right, top/bottom)
- [x] Floating icon or bar option in fixed footer mode

### Phase 3 - Advanced (Future)
- [ ] Transition animations
- [ ] Analytics integration
- [ ] A/B testing support
- [ ] Emoji scale alternative
- [ ] Conditional step logic

---

## 10. Appendices

### 10.1 Reference Screenshots

- `NPS-01.png` to `NPS-05.png`: Current flow in Moradigna
- `NPS_Component.jpg`: Scale variations (neutral vs colorful)
- `NPS_Form.jpg`: Complete layout with textarea
- `NPS_Oculto.png`: Collapsed state with trigger
- `NPS_001.png` to `NPS_004.png`: External style references

### 10.2 Useful Links

- [WeWeb Custom Components](https://docs.weweb.io/custom-components/)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [NPS Best Practices](https://www.netpromoter.com/)
- [GitHub Repository](https://github.com/imdouglasoliveira/nps_vue_weweb)

---

**Last updated:** December 14, 2025
