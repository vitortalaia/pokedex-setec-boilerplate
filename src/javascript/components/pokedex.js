import $ from 'jquery';
import emitter from 'js/emitter';
import componentLoader from 'js/component-loader';
import errorTemplate from 'js/templates/error.hbs';
import entryTemplate from 'js/templates/pokedex-entry.hbs';

class Pokedex {

  constructor(element, options = {}) {
    this.$element = element;
    this.options = options;
  }

  init() {
    this.displayPokemon();
  }

  displayPokemon() {
    emitter.emit('spinner:show');
    this.fetchPokemon();
  }

  fetchPokemon() {
    $.getJSON(this.options.endpoint)
      .then(this.onFetchPokemonSuccess.bind(this))
      .catch(this.onFetchPokemonFailure.bind(this));
  }

  onFetchPokemonSuccess(pokemon) {
    emitter.emit('spinner:hide');

    this.insertPokedexEntries(pokemon);
  }

  onFetchPokemonFailure() {
    emitter.emit('spinner:hide');

    this.$element.html(this.renderErrorTemplate());
  }

  insertPokedexEntries(pokemon) {
    this.$element.html(this.renderPokemonEntries(pokemon));

    componentLoader(this.$element.find('[data-component]'));
  }

  // eslint-disable-next-line class-methods-use-this
  renderPokemonEntries(pokemon) {
    /* istanbul ignore next */
    return entryTemplate({ pokemon });
  }

  // eslint-disable-next-line class-methods-use-this
  renderErrorTemplate() {
    /* istanbul ignore next */
    return errorTemplate();
  }
}

/* istanbul ignore next */
export default ($element) => {
  new Pokedex($element, $element.data()).init();
};

export { Pokedex };
