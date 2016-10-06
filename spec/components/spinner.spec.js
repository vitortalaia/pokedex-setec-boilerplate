/* eslint-disable no-unused-expressions */
import $ from 'jquery';
import emitter from 'js/emitter';
import { Spinner } from 'components/spinner';

describe('Spinner component', () => {
  let instance;
  let sandbox;

  // 1 - setup
  beforeEach(() => {
    instance = new Spinner($('<div />'));
    sandbox = sinon.sandbox.create();
  });

  // 4 - Teardown
  afterEach(() => {
    sandbox.restore();
  });

  describe('#init', () => {
    it('calls #bindListeners', () => {
      const stub = sandbox.stub(instance, 'bindListeners');

      // 2 - Exercise
      instance.init();

      // 3 - Verify
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('#bindListeners', () => {
    context('when spinner:show event is triggered', () => {
      it('calls #onSpinnerShow', () => {
        const stub = sandbox.stub(instance, 'onSpinnerShow');

        instance.bindListeners();
        emitter.emit('spinner:show');

        expect(stub.calledOnce).to.be.true;
      });
    });

    context('when spinner:hide is triggered', () => {
      it('calls #onSpinnerHide', () => {
        const stub = sandbox.stub(instance, 'onSpinnerHide');

        instance.bindListeners();
        emitter.emit('spinner:hide');

        expect(stub.calledOnce).to.be.true;
      });
    });
  });

  describe('#onSpinnerShow', () => {
    it('displays the spinner', () => {
      const visibleClass = instance.spinnerVisibleClass;

      instance.onSpinnerShow();
      const hasClass = instance.$element.hasClass(visibleClass);

      expect(hasClass).to.be.true;
    });
  });

  describe('#onSpinnerHide', () => {
    it('hides the spinner', () => {
      const visibleClass = instance.spinnerVisibleClass;

      instance.onSpinnerHide();
      const hasClass = instance.$element.hasClass(visibleClass);

      expect(hasClass).to.be.false;
    });
  });
});
