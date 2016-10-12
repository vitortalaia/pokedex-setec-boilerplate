import emitter from 'js/emitter';

class Pokemon {

  constructor(element, options = {}) {
    this.$element = element;
    this.options = options;
    this.isPokemonCaught = false;
    this.caughtClass = 'pokemon--caught';
  }

  init() {
    this.bindListeners();
  }

  bindListeners() {
    this.$element.on('click', this.onElementClick.bind(this));
  }

  onElementClick() {
    if (this.isPokemonCaught) {
      this.releasePokemon();
    } else {
      this.catchPokemon();
    }
  }

  releasePokemon() {
    const options = this.options;
    const message = `${options.releaseText} ${options.pokemonName}?`;

    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
      this.isPokemonCaught = false;
      this.toggleCaughtClass();
      this.sendNotification('released');
    }
  }

  catchPokemon() {
    this.isPokemonCaught = true;
    this.toggleCaughtClass();
    this.sendNotification('caught');
  }

  toggleCaughtClass() {
    this.$element.toggleClass(this.caughtClass);
  }

  sendNotification(event) {
    const notificationOptions = {
      body: `${this.options.pokemonName} was ${event}!`,
      icon: `images/pokemons/${this.options.pokemonId}.svg`,
    };

    emitter.emit('notification:show', notificationOptions);
  }
}

/* istanbul ignore next */
export default ($element) => {
  new Pokemon($element, $element.data()).init();
};

export { Pokemon };
