import emitter from 'js/emitter';

class PokedexNotification {

  constructor(element, options = {}) {
    this.$element = element;
    this.defaultTitle = options.defaultTitle;
    this.$element.data('pokedex-notification', this);
  }

  init() {
    this.requestPermission();
    this.bindListeners();
  }

  // eslint-disable-next-line class-methods-use-this
  requestPermission() {
    Notification.requestPermission();
  }

  bindListeners() {
    emitter.on('notification:show', this.onNotificationShow.bind(this));
  }

  onNotificationShow(options) {
    this.notification = new Notification(this.defaultTitle, options);
  }
}

/* istanbul ignore next */
export default ($element) => {
  new PokedexNotification($element, $element.data()).init();
};

export { PokedexNotification };
