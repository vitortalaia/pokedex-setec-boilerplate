/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import emitter from 'js/emitter';
import { PokedexNotification } from 'components/pokedex-notification';

describe('PokedexNotification spec', () => {
  let instance;
  let sandbox;
  let $element;

  beforeEach(() => {
    $element = $('<div data-default-title="Pokédex"/>');
    instance = new PokedexNotification($element);
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#init', () => {
    it('calls #requestPermission', () => {
      const stub = sandbox.stub(instance, 'requestPermission');
      sandbox.stub(instance, 'bindListeners');

      instance.init();

      expect(stub.calledOnce).to.be.true;
    });

    it('calls #bindListeners', () => {
      const stub = sandbox.stub(instance, 'bindListeners');
      sandbox.stub(instance, 'requestPermission');

      instance.init();

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#requestPermission', () => {
    it('asks the user for permission to display notifications', () => {
      const stub = sandbox.stub(Notification, 'requestPermission');

      instance.requestPermission();

      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#bindListeners', () => {
    context('when notification:show event is triggered', () => {
      it('calls #onNotificationShow', () => {
        const stub = sandbox.stub(instance, 'onNotificationShow');

        instance.bindListeners();
        emitter.emit('notification:show');

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#onNotificationShow', () => {
    it('displays a new notification', () => {
      instance.onNotificationShow();

      expect(instance.notification).to.be.instanceof(Notification);
    });
  });
});
