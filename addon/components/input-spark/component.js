import Ember from 'ember';
import layout from './template';
import styles from './styles';

import SparkComponent from 'ember-sparks/components/spark-component';

export default SparkComponent.extend({
  layout,
  styles,

  showError: false,
  errorComponent: "input-spark/error-spark",
  typingTimer: null,
  typingInterval: 1000,

  valueDidChange: Ember.observer('value', function() {
    this.set('error', null);
  }),

  errorDidChange: Ember.on('init', Ember.observer('error', function() {
    let error = this.get('error');

    const ERROR_FADE_DURATION = 300;

    if (error) {
      this.set('showError', true);
    } else {
      /*
       * Let the error object animate
       * before destroying:
       */
      Ember.run.later((() => {
        this.set('showError', false);
      }), ERROR_FADE_DURATION);
    }
  })),

  startTypingTimer() {
    let typingTimer = this.get('typingTimer');
    let typingInterval = this.get('typingInterval');

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => this.sendAction('onFinishedTyping'), typingInterval);
    this.set('typingTimer', typingTimer);
  },

  actions: {

    // Called when clicking on the virtual-input:
    focus() {
      this.$('input').focus();
    },

    didFocus() {
      this.set('isFocused', true);
      this.sendAction('onFocus', ...arguments);
    },

    didFocusOut() {
      this.set('isFocused', false);
      this.sendAction('onFocusOut', ...arguments);
    },

    didKeyUp(value, e) {
      this.sendAction('onKeyUp', ...arguments);

      if (e.key === "Enter") {
        this.sendAction('onEnter', ...arguments);
      }

      this.startTypingTimer();
    },

  },

});

