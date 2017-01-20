import Ember from 'ember';
let { $ } = Ember;
import layout from './template';
import styles from './styles';

import SparkComponent from '../../spark-component';

export default SparkComponent.extend({
  layout,
  styles,

  tagName: 'span',

  error: null,
  errorMessage: null,
  scrollOnError: true,

  localClassNameBindings: [
    'visible',  
  ],

  visible: Ember.computed('error', 'errorMessage', function() {
    let error = this.get('error');
    let errorMessage = this.get('errorMessage');

    return error && errorMessage;
  }),

  errorDidChange: Ember.on('init', Ember.observer('error', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      this.handleError();
    });
  })),

  handleError() {
    let errMessage = this.get('error');
    let shouldScroll = this.get('scrollOnError');

    if (!errMessage) { return; }

    if (shouldScroll === false) {
      this.showError();
    } else {
      this.scrollToError()
      .then(() => {
        this.showError();
      });
    }
  },

  showError() {
    const DELAY = 100;
    let errMessage = this.get('error');

    Ember.run.later((() => {
      this.set('errorMessage', errMessage);
    }), DELAY);
  },

  /*
   * Scroll to error field
   * before showing error:
   */
  scrollToError() {
    const OFFSET = 200;
    const SCROLL_DURATION = 300;

    return new Ember.RSVP.Promise((resolve) => {
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

