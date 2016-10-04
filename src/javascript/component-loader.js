import $ from 'jquery';

function loader(element) {
  const $component = $(element);
  const components = $component.attr('data-component');

  if (components) {
    components.split(' ').forEach((component) => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(`components/${component}`).default($component);
    });
  }
}

export default ($element) => {
  Array.prototype.forEach.call($element, loader);

  return $element;
};
