import $ from 'jquery';
import componentLoader from 'js/component-loader';

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
});
