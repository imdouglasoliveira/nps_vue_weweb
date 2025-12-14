<template>
  <div class="nps-wrapper" :class="wrapperClasses" :style="wrapperStyle">

    <!-- Minimized Bar (shown when collapsed) -->
    <div
      v-if="isMinimized && positionMode === 'fixed'"
      class="nps-minimized"
      :class="minimizedPositionClass"
      :style="minimizedStyle"
      @click="handleExpand"
    >
      <span class="minimized-text">{{ content.minimizedText || 'Evaluate the platform' }}</span>
      <component :is="minimizedIconComponent" v-if="minimizedIcon !== 'none'" class="minimized-icon" />
    </div>

    <!-- Preview Mode Indicator & Controls -->
    <div v-if="isPreviewMode" class="preview-controls">
      <span class="preview-badge">PREVIEW MODE</span>
      <div class="preview-nav">
        <button class="preview-btn" @click="previewPrevStep" :disabled="currentStepIndex === 0">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
        </button>
        <span class="preview-step-info">Step {{ currentStepIndex + 1 }} / {{ totalSteps }}</span>
        <button class="preview-btn" @click="previewNextStep" :disabled="currentStepIndex >= totalSteps - 1">
          <svg viewBox="0 0 24 24" width="16" height="16"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
        </button>
      </div>
    </div>

    <!-- Full NPS Panel -->
    <div class="nps-host" :style="hostStyle" v-show="isVisible && !isMinimized">
      <!-- Close Button -->
      <button
        v-if="content.showCloseButton !== false"
        class="nps-close"
        @click="handleClose"
        aria-label="Close"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Back Button (shown on steps after rating) -->
      <button
        v-if="content.showBackButton && canGoBack"
        class="nps-back"
        @click="handleBack"
        aria-label="Back"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <span>{{ content.backButtonText || 'Back' }}</span>
      </button>

      <div class="nps-container" :style="containerStyle">

        <!-- Step 1: Rating (always shown first) -->
        <div v-if="currentStepIndex === 0" class="nps-step">
          <p v-if="content.question" class="nps-question">{{ content.question }}</p>

          <div v-if="content.showLabels" class="nps-labels">
            <span class="label-low">{{ content.lowLabel || 'Not likely' }}</span>
            <span class="label-high">{{ content.highLabel || 'Very likely' }}</span>
          </div>

          <!-- Numbers Display -->
          <div v-if="displayType === 'numbers'" class="nps-buttons">
            <button
              v-for="n in scaleValues"
              :key="n"
              class="nps-btn"
              :style="getButtonStyle(n)"
              @click="handleSelect(n)"
            >
              {{ n }}
            </button>
          </div>

          <!-- Stars Display -->
          <div v-else class="nps-stars">
            <button
              v-for="n in scaleValues"
              :key="n"
              class="nps-star"
              :style="getStarStyle(n)"
              @click="handleSelect(n)"
              @mouseenter="hoverValue = n"
              @mouseleave="hoverValue = null"
            >
              <svg viewBox="0 0 24 24" :width="buttonSize" :height="buttonSize">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  :fill="getStarFill(n)"
                  :stroke="getStarStroke(n)"
                  stroke-width="1.5"
                />
              </svg>
            </button>
          </div>

          <button
            v-if="hasMoreSteps"
            class="nps-submit"
            :style="submitBtnStyle"
            :disabled="selectedValue === null"
            @click="handleNextStep"
          >
            {{ content.nextButtonText || 'Next' }}
          </button>
          <button
            v-else
            class="nps-submit"
            :style="submitBtnStyle"
            :disabled="selectedValue === null"
            @click="handleSubmit"
          >
            {{ content.submitButtonText || 'Submit' }}
          </button>
        </div>

        <!-- Dynamic Questions from questions array -->
        <div v-else-if="currentQuestion" class="nps-step">
          <p class="nps-question">{{ currentQuestion.question }}</p>

          <!-- Short Question with options -->
          <div v-if="currentQuestion.type === 'shortQuestion'" class="nps-options">
            <button
              v-for="(option, idx) in currentQuestionOptions"
              :key="idx"
              class="nps-option"
              :class="{ selected: answers[currentStepIndex - 1] === option }"
              :style="getOptionStyle(option)"
              @click="setAnswer(currentStepIndex - 1, option)"
            >
              {{ option }}
            </button>
          </div>

          <!-- Free Text -->
          <textarea
            v-else-if="currentQuestion.type === 'freeText'"
            :value="answers[currentStepIndex - 1] || ''"
            @input="setAnswer(currentStepIndex - 1, $event.target.value)"
            class="nps-textarea"
            :placeholder="currentQuestion.placeholder || 'Type your feedback here...'"
            rows="4"
          ></textarea>

          <button
            v-if="!isLastQuestion"
            class="nps-submit"
            :style="submitBtnStyle"
            :disabled="!canProceed"
            @click="handleNextStep"
          >
            {{ content.nextButtonText || 'Next' }}
          </button>
          <button
            v-else
            class="nps-submit"
            :style="submitBtnStyle"
            :disabled="!canProceed"
            @click="handleSubmit"
          >
            {{ content.submitButtonText || 'Submit' }}
          </button>
        </div>

        <!-- Thank You Step -->
        <div v-else-if="currentStepIndex === totalSteps - 1" class="nps-step nps-thankyou">
          <div class="thankyou-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <circle cx="12" cy="12" r="10" fill="none" :stroke="thankYouColor" stroke-width="2"/>
              <path d="M8 12l2.5 2.5L16 9" fill="none" :stroke="thankYouColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="thankyou-title">{{ content.thankYouTitle || 'Thank you!' }}</h3>
          <p class="thankyou-message">{{ content.thankYouMessage || 'Your feedback helps us improve.' }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// Icon components for minimized bar
const StarIcon = {
  template: `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
};
const ChatIcon = {
  template: `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
};
const HeartIcon = {
  template: `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
};
const ThumbsUpIcon = {
  template: `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`
};
const SmileIcon = {
  template: `<svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="2"/></svg>`
};

export default {
  name: 'NpsRating',
  components: {
    StarIcon,
    ChatIcon,
    HeartIcon,
    ThumbsUpIcon,
    SmileIcon,
  },
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      currentStepIndex: 0,
      selectedValue: null,
      answers: [], // Array to store answers for each question
      hoverValue: null,
      isVisible: false,
      isMinimized: false,
    };
  },
  computed: {
    questions() {
      // Get questions array from binding or return empty array
      const q = this.content.questions;
      if (Array.isArray(q)) return q;
      return [];
    },
    totalSteps() {
      // Rating (1) + questions from array + thankYou (1)
      return 1 + this.questions.length + 1;
    },
    hasMoreSteps() {
      return this.questions.length > 0;
    },
    currentQuestion() {
      // Returns the current question object (null if on rating or thankYou step)
      if (this.currentStepIndex === 0) return null;
      if (this.currentStepIndex >= this.totalSteps - 1) return null;
      return this.questions[this.currentStepIndex - 1];
    },
    currentQuestionOptions() {
      if (!this.currentQuestion) return [];
      const opts = this.currentQuestion.options;
      if (Array.isArray(opts)) return opts;
      if (typeof opts === 'string') return opts.split(',').map(s => s.trim());
      return [];
    },
    isLastQuestion() {
      return this.currentStepIndex === this.totalSteps - 2;
    },
    canProceed() {
      if (this.currentStepIndex === 0) {
        return this.selectedValue !== null;
      }
      const answer = this.answers[this.currentStepIndex - 1];
      if (!this.currentQuestion) return true;
      if (this.currentQuestion.type === 'freeText') return true; // Free text is optional
      return answer !== undefined && answer !== null && answer !== '';
    },
    canGoBack() {
      return this.currentStepIndex > 0 && this.currentStepIndex < this.totalSteps - 1;
    },
    displayType() {
      return this.content.displayType || 'numbers';
    },
    minValue() {
      return this.content.minValue ?? 0;
    },
    maxValue() {
      return this.content.maxValue ?? 10;
    },
    buttonSize() {
      return this.content.buttonSize || 40;
    },
    starColor() {
      return this.content.starColor || '#FFD700';
    },
    scaleValues() {
      const arr = [];
      for (let i = this.minValue; i <= this.maxValue; i++) {
        arr.push(i);
      }
      return arr;
    },
    positionMode() {
      return this.content.positionMode || 'inline';
    },
    minimizedIcon() {
      return this.content.minimizedIcon || 'star';
    },
    minimizedIconComponent() {
      const icons = {
        star: 'StarIcon',
        chat: 'ChatIcon',
        heart: 'HeartIcon',
        thumbsUp: 'ThumbsUpIcon',
        smile: 'SmileIcon',
      };
      return icons[this.minimizedIcon] || 'StarIcon';
    },
    minimizedPositionClass() {
      const pos = this.content.minimizedPosition || 'center';
      return `minimized-${pos}`;
    },
    wrapperClasses() {
      return {
        'position-fixed': this.positionMode === 'fixed',
        'position-inline': this.positionMode === 'inline',
      };
    },
    wrapperStyle() {
      if (this.positionMode === 'fixed') {
        return {
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: '999',
        };
      }
      return {};
    },
    hostStyle() {
      const bgColor = this.content.backgroundColor || '#ffffff';
      const style = {
        backgroundColor: bgColor,
        width: '100%',
      };
      if (this.positionMode === 'fixed') {
        style.boxShadow = '0 -4px 20px rgba(0, 0, 0, 0.15)';
        style.borderTopLeftRadius = '16px';
        style.borderTopRightRadius = '16px';
      }
      return style;
    },
    minimizedStyle() {
      return {
        backgroundColor: this.content.minimizedBackgroundColor || '#ffffff',
        color: this.content.minimizedTextColor || '#333333',
        '--icon-color': this.content.minimizedIconColor || '#1976D2',
      };
    },
    containerStyle() {
      const maxWidth = this.content.maxWidth || 1080;
      return {
        width: '100%',
        maxWidth: maxWidth + 'px',
        margin: '0 auto',
        padding: '24px',
      };
    },
    submitBtnStyle() {
      return {
        backgroundColor: this.content.primaryColor || '#1976D2',
      };
    },
    thankYouColor() {
      return this.content.thankYouColor || '#43A047';
    },
    showDelay() {
      return this.content.showDelay || 0;
    },
    isPreviewMode() {
      return this.content.previewMode === true;
    },
  },
  watch: {
    'content.previewStep': {
      handler(newStep) {
        if (this.isPreviewMode && typeof newStep === 'number') {
          // Clamp to valid range
          const clampedStep = Math.max(0, Math.min(newStep, this.totalSteps - 1));
          if (this.currentStepIndex !== clampedStep) {
            this.currentStepIndex = clampedStep;
          }
        }
      },
      immediate: true,
    },
    isPreviewMode(newVal) {
      if (newVal) {
        // Reset to initial state when entering preview mode
        this.selectedValue = 5; // Default preview value
        this.answers = this.questions.map(() => null);
      }
    },
  },
  mounted() {
    this.initVisibility();
    // Initialize preview mode if enabled
    if (this.isPreviewMode && typeof this.content.previewStep === 'number') {
      this.currentStepIndex = Math.max(0, Math.min(this.content.previewStep, this.totalSteps - 1));
      this.selectedValue = 5;
    }
  },
  methods: {
    initVisibility() {
      const delay = this.showDelay;
      if (delay > 0) {
        setTimeout(() => {
          this.isVisible = true;
          this.$emit('trigger-event', {
            name: 'shown',
            event: {},
          });
        }, delay);
      } else {
        this.isVisible = true;
      }
    },
    handleClose() {
      this.isMinimized = true;
      this.$emit('trigger-event', {
        name: 'minimized',
        event: {},
      });
    },
    handleExpand() {
      this.isMinimized = false;
      this.$emit('trigger-event', {
        name: 'expanded',
        event: {},
      });
    },
    handleBack() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.$emit('trigger-event', {
          name: 'stepChanged',
          event: { step: this.currentStepIndex, stepIndex: this.currentStepIndex },
        });
      }
    },
    setAnswer(index, value) {
      // Use Vue.set pattern for reactivity
      const newAnswers = [...this.answers];
      newAnswers[index] = value;
      this.answers = newAnswers;
    },
    getColor(n) {
      if (this.content.colorScheme === 'neutral') {
        return this.selectedValue === n ? (this.content.primaryColor || '#1976D2') : '#E0E0E0';
      }
      const range = this.maxValue - this.minValue;
      const pct = range > 0 ? (n - this.minValue) / range : 0;
      if (pct <= 0.3) return '#E53935';
      if (pct <= 0.6) return '#FDD835';
      return '#43A047';
    },
    getButtonStyle(n) {
      const isSelected = this.selectedValue === n;
      const hasSelection = this.selectedValue !== null;
      const color = this.getColor(n);
      const size = this.buttonSize;

      return {
        width: size + 'px',
        height: size + 'px',
        backgroundColor: isSelected || this.content.colorScheme === 'colorful' ? color : '#E0E0E0',
        opacity: hasSelection && !isSelected ? 0.4 : 1,
        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        color: isSelected || this.content.colorScheme === 'colorful' ? '#fff' : '#666',
      };
    },
    getStarStyle() {
      return {
        opacity: 1,
      };
    },
    getStarFill(n) {
      const activeValue = this.hoverValue !== null ? this.hoverValue : this.selectedValue;
      const isFilled = activeValue !== null && n <= activeValue;
      if (!isFilled) return 'transparent';
      return this.starColor;
    },
    getStarStroke(n) {
      const activeValue = this.hoverValue !== null ? this.hoverValue : this.selectedValue;
      const isFilled = activeValue !== null && n <= activeValue;
      if (isFilled) return this.starColor;
      return '#BDBDBD';
    },
    getOptionStyle(option) {
      const isSelected = this.answers[this.currentStepIndex - 1] === option;
      return {
        backgroundColor: isSelected ? (this.content.primaryColor || '#1976D2') : '#f5f5f5',
        color: isSelected ? '#fff' : '#333',
        borderColor: isSelected ? (this.content.primaryColor || '#1976D2') : '#ddd',
      };
    },
    handleSelect(n) {
      this.selectedValue = n;
      // Emit change event (for any value change)
      this.$emit('trigger-event', {
        name: 'change',
        event: { value: n },
      });
      // Emit ratingSelected event (specific for first step rating)
      // This allows immediate saving of the rating before proceeding
      this.$emit('trigger-event', {
        name: 'ratingSelected',
        event: { rating: n },
      });
    },
    handleNextStep() {
      if (this.currentStepIndex < this.totalSteps - 1) {
        this.currentStepIndex++;
        this.$emit('trigger-event', {
          name: 'stepChanged',
          event: { step: this.currentStepIndex, stepIndex: this.currentStepIndex },
        });
      }
    },
    handleSubmit() {
      // Go to thank you step
      this.currentStepIndex = this.totalSteps - 1;

      // Build answers array with question info
      const formattedAnswers = this.questions.map((q, idx) => ({
        type: q.type,
        question: q.question,
        answer: this.answers[idx] || null,
      }));

      this.$emit('trigger-event', {
        name: 'submit',
        event: {
          rating: this.selectedValue,
          answers: formattedAnswers,
        },
      });

      // Auto-minimize after thank you if configured
      if (this.content.autoCloseDelay && this.content.autoCloseDelay > 0) {
        setTimeout(() => {
          this.isMinimized = true;
        }, this.content.autoCloseDelay);
      }
    },
    previewPrevStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
      }
    },
    previewNextStep() {
      if (this.currentStepIndex < this.totalSteps - 1) {
        this.currentStepIndex++;
      }
    },
  },
};
</script>

<style scoped>
/* Preview Mode Controls */
.preview-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  padding: 8px 16px;
  gap: 12px;
}

.preview-badge {
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.preview-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.preview-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.preview-step-info {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  min-width: 80px;
  text-align: center;
}

.nps-wrapper {
  width: 100%;
}

.nps-wrapper.position-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

/* Minimized Bar */
.nps-minimized {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nps-minimized.minimized-left {
  justify-content: flex-start;
}

.nps-minimized.minimized-center {
  justify-content: center;
}

.nps-minimized.minimized-right {
  justify-content: flex-end;
}

.nps-minimized:hover {
  filter: brightness(0.97);
}

.minimized-text {
  font-size: 14px;
  font-weight: 500;
}

.minimized-icon {
  flex-shrink: 0;
  color: var(--icon-color, #1976D2);
}

.nps-host {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nps-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
  z-index: 10;
}

.nps-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.nps-back {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  font-size: 13px;
  transition: all 0.2s ease;
  z-index: 10;
}

.nps-back:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  border-color: #bbb;
}

.nps-container {
  width: 100%;
}

.nps-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nps-question {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #333;
  padding: 0 50px;
}

.nps-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
  padding: 0 4px;
}

.nps-labels span {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nps-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.nps-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nps-btn:hover {
  transform: scale(1.15) !important;
  opacity: 1 !important;
}

.nps-stars {
  display: flex;
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.nps-star {
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.nps-star:hover {
  transform: scale(1.2);
}

.nps-star svg {
  display: block;
  transition: all 0.15s ease;
}

.nps-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
}

.nps-option {
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #f5f5f5;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nps-option:hover {
  border-color: #999;
}

.nps-option.selected {
  transform: scale(1.02);
}

.nps-textarea {
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 20px;
}

.nps-textarea:focus {
  outline: none;
  border-color: #1976D2;
}

.nps-submit {
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nps-submit:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.nps-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nps-thankyou {
  padding: 24px 20px;
}

.thankyou-icon {
  margin-bottom: 12px;
}

.thankyou-title {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.thankyou-message {
  margin: 0;
  font-size: 15px;
  color: #666;
  text-align: center;
}

/* Mobile First */
@media (max-width: 480px) {
  .nps-container {
    padding: 16px !important;
  }

  .nps-question {
    font-size: 16px;
    padding: 0 40px;
  }

  .nps-buttons {
    gap: 6px;
  }

  .nps-btn {
    width: 32px !important;
    height: 32px !important;
    font-size: 12px;
    border-radius: 6px;
  }

  .nps-stars {
    gap: 2px;
  }

  .nps-star {
    padding: 2px;
  }

  .nps-option {
    padding: 10px 14px;
    font-size: 13px;
  }

  .nps-submit {
    padding: 10px 24px;
    font-size: 14px;
    width: 100%;
  }

  .nps-close {
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
  }

  .nps-back {
    top: 8px;
    left: 8px;
    padding: 4px 8px;
    font-size: 12px;
  }

  .thankyou-title {
    font-size: 20px;
  }

  .thankyou-message {
    font-size: 14px;
  }

  .nps-minimized {
    padding: 10px 16px;
  }

  .minimized-text {
    font-size: 13px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .nps-container {
    padding: 20px !important;
  }

  .nps-btn {
    width: 36px !important;
    height: 36px !important;
    font-size: 13px;
  }
}
</style>
