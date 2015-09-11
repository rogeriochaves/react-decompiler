'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jsBeautify = require('js-beautify');

var getProps = function getProps(component) {
  return component._store.originalProps;
};

var getChildren = function getChildren(component) {
  return getProps(component).children;
};

var getPropsKeys = function getPropsKeys(component) {
  return Object.keys(getProps(component)).filter(function (prop) {
    return prop !== 'children';
  });
};

var getComponentType = function getComponentType(component) {
  return component.type.name ? component.type.name : component.type;
};

var appendStringifiedProp = function appendStringifiedProp(component) {
  return function (accumulated, prop) {
    return accumulated + ' ' + prop + '="' + getProps(component)[prop] + '"';
  };
};

var stringifyProps = function stringifyProps(component) {
  return getPropsKeys(component).reduce(appendStringifiedProp(component), '');
};

var stringifyComposedComponent = function stringifyComposedComponent(component) {
  return '<' + getComponentType(component) + stringifyProps(component) + '>' + stringifyItems(getChildren(component)) + '</' + getComponentType(component) + '>';
};

var stringifySimpleComponent = function stringifySimpleComponent(component) {
  return '<' + getComponentType(component) + stringifyProps(component) + ' />';
};

var stringifyComponent = function stringifyComponent(component) {
  return getChildren(component) ? stringifyComposedComponent(component) : stringifySimpleComponent(component);
};

var stringifyItem = function stringifyItem(item) {
  return _reactAddons2['default'].addons.TestUtils.isElement(item) ? stringifyComponent(item) : item.toString();
};

var stringifyItems = function stringifyItems(components) {
  return [].concat(components).map(stringifyItem).join('');
};

var decompile = stringifyItems;

exports.decompile = decompile;
var formatted = function formatted(items) {
  return (0, _jsBeautify.html)(stringifyItems(items), { indent_size: 2 });
};
exports.formatted = formatted;
