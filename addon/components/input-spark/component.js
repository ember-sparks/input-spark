import Ember from 'ember';
import layout from './template';
import styles from './styles';

import SparkComponent from 'ember-sparks/components/spark-component';

const {
  assert,
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
  type: "text",
  placeholder: null,
  readonly: true,
  label: true,
  error: null,
  errorComponent: "input-spark/error-spark",
  scrollOnError: false,

  VALID_TYPES: [
    'text',
    'email',
    'search',
    'tel',
    'url',
    'password',
  ],

  /*
   * @private
   */
  _showError: false,
  _typingTimer: null,
  _typingInterval: 1000,

  _inputType: computed('type', {
    get() {
      let type = this.get('type');

      if (this.VALID_TYPES.indexOf(type) === -1) {
        assert(`input-spark does not support type="${type}"!`); 
      }

      return type;
    },
  }),

  _inputLabel: computed('label', 'placeholder', {
    get() {
      let label = this.get('label');
      let placeholder = this.get('placeholder');

      if (typeof label === "string") {
        return label;
      } else if (label) {
        return placeholder;
      }
    },
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

    onBlur() {
      this.set('_isFocused', false);
      this.sendAction('onBlur', ...arguments);
    },

    onKeyUp(e) {
      let value = e.target.value;

      this.sendAction('onKeyUp', value, e);

      if (e.key === "Enter") {
        this.sendAction('onEnter', value, e);
      }
    },

    onKeyDown(e) {
      let value = e.target.value;

      this.sendAction('onKeyDown', value, e);
    },

    onInput(e) {
      let value = e.target.value;

      this.sendAction('onInput', value, e);

      this._startTypingTimer();
    },

    onChange(e) {
      let value = e.target.value;
      this.sendAction('onChange', value, e);
    },

  },

});

