import $ from 'jquery';
import componentLoader from 'js/component-loader';
import { Spinner } from 'components/spinner';

describe('componentLoader', () => {
  let $component;

  context('when element does not have a [data-component] attribute', () => {
    beforeEach(() => {
      $component = $('<div>');
    });

    it('does not set a component', () => {
      expect(componentLoader($component).data()).to.deep.equal({});
    });
  });

  context('when element has a valid [data-component] attribute', () => {
    it('sets a component', () => {
      $component.attr('data-component', 'spinner');
      const element = componentLoader($component);

      expect(element.data('spinner')).to.be.instanceof(Spinner);
    });
  });
});
