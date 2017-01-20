import Ember from 'ember';
import layout from './template';
import styles from './styles';

import SparkComponent from 'ember-sparks/components/spark-component';

const {
  computed,
  observer,
  on,
  run: { later },
} = Ember;

export default SparkComponent.extend({
  layout,
  styles,

  /*
   * @public
   */
  value: null,
  prefix: null,
  type: null,
  placeholder: null,
  label: true,
  error: null,
  errorComponent: "input-spark/error-spark",
  scrollOnError: false,

  /*
   * @private
   */
  _showError: false,
  _typingTimer: null,
  _typingInterval: 1000,

  _inputLabel: computed('label', 'placeholder', function() {
    let label = this.get('label');
    let placeholder = this.get('placeholder');

    if (typeof label === "string") {
      return label;
    } else if (label) {
      return placeholder;
    }
  }),

  valueDidChange: observer('value', function() {
    this.set('error', null);
  }),

  errorDidChange: on('init', observer('error', function() {
    let error = this.get('error');

    const ERROR_FADE_DURATION = 300;

    if (error) {
      this.set('_showError', true);
    } else {
      /*
       * Let the error object animate
       * before destroying:
       */
      later((() => {
        this.set('_showError', false);
      }), ERROR_FADE_DURATION);
    }
  })),

  _startTypingTimer() {
    let typingTimer = this.get('_typingTimer');
    let typingInterval = this.get('_typingInterval');

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => this.sendAction('onFinishTyping'), typingInterval);
    this.set('_typingTimer', typingTimer);
  },

  actions: {

    // Called when clicking on the virtual-input:
    focus() {
      let $input = this.$('input');

      if (!$input.is(":focus")) {
        $input.focus();
      }
    },

    onFocus() {
      this.set('_isFocused', true);
      this.sendAction('onFocus', ...arguments);
    },

    onFocusOut() {
      this.set('_isFocused', false);
      this.sendAction('onFocusOut', ...arguments);
    },

    onKeyUp(e) {
      let value = e.target.value;

      this.sendAction('onKeyUp', value, e);

      if (e.key === "Enter") {
        this.sendAction('onEnter', value, e);
      }

      this._startTypingTimer();
    },

  },

});

