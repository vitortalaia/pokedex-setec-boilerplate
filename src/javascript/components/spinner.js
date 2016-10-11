import emitter from 'js/emitter';

class Spinner {

  constructor(element) {
    this.$element = element;
    this.spinnerVisibleClass = 'spinner--visible';
    this.$element.data('spinner', this);
  }

  init() {
    this.bindListeners();
  }

  bindListeners() {
    emitter.on('spinner:show', this.onSpinnerShow.bind(this));
    emitter.on('spinner:hide', this.onSpinnerHide.bind(this));
  }

  onSpinnerShow() {
    this.$element.addClass(this.spinnerVisibleClass);
  }

  onSpinnerHide() {
    this.$element.removeClass(this.spinnerVisibleClass);
  }
}

/* istanbul ignore next */
export default ($element) => {
  new Spinner($element).init();
};

export { Spinner };
