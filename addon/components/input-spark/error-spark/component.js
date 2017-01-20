import Ember from 'ember';
import layout from './template';
import styles from './styles';

import SparkComponent from 'ember-sparks/components/spark-component';

const {
  $,
  computed,
  observer,
  on,
  run: { 
    later,
    scheduleOnce,
  },
  RSVP: { Promise },
} = Ember;

export default SparkComponent.extend({
  layout,
  styles,

  tagName: 'span',

  _errorMessage: null,

  localClassNameBindings: [
    'visible',  
  ],

  visible: computed('error', '_errorMessage', {
    get() {
      let error = this.get('error');
      let errorMessage = this.get('_errorMessage');

      return error && errorMessage;
    },
  }),

  errorDidChange: on('init', observer('error', function() {
    scheduleOnce('afterRender', () => {
      this.handleError();
    });
  })),

  handleError() {
    let errMessage = this.get('error');
    let shouldScroll = this.get('scrollOnError');

    if (!errMessage) { return; }

    if (shouldScroll === false) {
      this._showError();
    } else {
      this._scrollToError()
      .then(() => {
        this._showError();
      });
    }
  },

  _showError() {
    const DELAY = 100;
    let errMessage = this.get('error');

    later((() => {
      this.set('_errorMessage', errMessage);
    }), DELAY);
  },

  /*
   * Scroll to error field
   * before showing error:
   */
  _scrollToError() {
    const OFFSET = 200;
    const SCROLL_DURATION = 300;

    return new Promise((resolve) => {
      let elPos = this.$().offset();
      let elPosTop = elPos && elPos.top;

      $('html, body').animate({
        scrollTop: elPosTop - OFFSET,
      }, SCROLL_DURATION, () => {
        return resolve();
      });
    });
  },

});

