/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import emitter from 'js/emitter';
import { Pokemon } from 'components/pokemon';

describe('Pokemon spec', () => {
  let instance;
  let sandbox;
  let $element;

  beforeEach(() => {
    $element = $(fixture.load('pokemon.html')[0]);
    instance = new Pokemon($element, $element.data());
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    fixture.cleanup();
    sandbox.restore();
  });

  describe('#init', () => {
    it('calls #bindListeners', () => {
      const stub = sandbox.stub(instance, 'bindListeners');

      instance.init();

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#bindListeners', () => {
    context('when click event is triggered on instance.$element', () => {
      it('calls #onElementClick', () => {
        const stub = sandbox.stub(instance, 'onElementClick');

        instance.bindListeners();
        instance.$element.trigger('click');

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#onElementClick', () => {
    context('when pokemon is caught', () => {
      it('calls #releasePokemon', () => {
        const stub = sandbox.stub(instance, 'releasePokemon');
        instance.isPokemonCaught = true;

        instance.onElementClick();

        expect(stub.calledOnce).to.be.true;
      });
    });

    context('when pokemon is not caught yet', () => {
      it('calls #catchPokemon', () => {
        const stub = sandbox.stub(instance, 'catchPokemon');
        instance.isPokemonCaught = false;

        instance.onElementClick();

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#releasePokemon', () => {
    context('when user confirms the action', () => {
      beforeEach(() => {
        sandbox.stub(window, 'confirm').returns(true);
      });

      it('sets instance.isPokemonCaught to false', () => {
        sandbox.stub(instance, 'sendNotification');
        sandbox.stub(instance, 'toggleCaughtClass');
        instance.isPokemonCaught = true;

        instance.releasePokemon();

        expect(instance.isPokemonCaught).to.be.false;
      });

      it('calls #toggleCaughtClass', () => {
        const stub = sandbox.stub(instance, 'toggleCaughtClass');
        sandbox.stub(instance, 'sendNotification');

        instance.releasePokemon();

        expect(stub.calledOnce).to.be.true;
      });

      it('properly calls #sendNotification', () => {
        const stub = sandbox.stub(instance, 'sendNotification');
        sandbox.stub(instance, 'toggleCaughtClass');

        instance.releasePokemon();

        expect(stub.calledWith('released')).to.be.true;
      });
    });

    context('when user cancels the action', () => {
      beforeEach(() => {
        sandbox.stub(window, 'confirm').returns(false);
      });

      it('does not modify instance.isPokemonCaught', () => {
        instance.isPokemonCaught = true;

        instance.releasePokemon();

        expect(instance.isPokemonCaught).to.be.true;
      });

      it('does not call #toggleCaughtClass', () => {
        const stub = sandbox.stub(instance, 'toggleCaughtClass');

        instance.releasePokemon();

        expect(stub.called).to.be.false;
      });

      it('does not call #sendNotification', () => {
        const stub = sandbox.stub(instance, 'sendNotification');

        instance.releasePokemon();

        expect(stub.called).to.be.false;
      });
    });
  });

  describe('#catchPokemon', () => {
    it('sets instance.isPokemonCaught to true', () => {
      sandbox.stub(instance, 'sendNotification');
      sandbox.stub(instance, 'toggleCaughtClass');
      instance.isPokemonCaught = false;

      instance.catchPokemon();

      expect(instance.isPokemonCaught).to.be.true;
    });

    it('calls #toggleCaughtClass', () => {
      const stub = sandbox.stub(instance, 'toggleCaughtClass');
      sandbox.stub(instance, 'sendNotification');

      instance.catchPokemon();

      expect(stub.calledOnce).to.be.true;
    });

    it('properly calls #sendNotification', () => {
      const stub = sandbox.stub(instance, 'sendNotification');
      sandbox.stub(instance, 'toggleCaughtClass');

      instance.catchPokemon();

      expect(stub.calledWith('caught')).to.be.true;
    });
  });

  describe('#toggleCaughtClass', () => {
    it('calls toggleClass on instance.$element', () => {
      const spy = sandbox.spy(instance.$element, 'toggleClass');

      instance.toggleCaughtClass();

      expect(spy.calledWith(instance.caughtClass)).to.be.true;
    });
  });

  describe('#sendNotification', () => {
    it('emits notification:show event', () => {
      const spy = sandbox.spy(emitter, 'emit');
      const expectedOptions = {
        body: `${instance.options.pokemonName} was caught!`,
        icon: `images/pokemons/${instance.options.pokemonId}.svg`,
      };

      instance.sendNotification('caught');

      expect(spy.calledWith('notification:show', expectedOptions)).to.be.true;
    });
  });
});
