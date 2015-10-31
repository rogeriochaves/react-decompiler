'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jsBeautify = require('js-beautify');

var _stringifyObject = require('stringify-object');

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var getProps = function getProps(component) {
  return (0, _objectAssign2['default'])(component._store.originalProps, getKey(component));
};

var getKey = function getKey(component) {
  return component.key ? { key: component.key } : {};
};

var getChildren = function getChildren(component) {
  return getProps(component).children;
};

var getPropsKeys = function getPropsKeys(component) {
  return Object.keys(getProps(component)).filter(function (prop) {
    return prop !== 'children';
  });
};

var getComponentName = function getComponentName(component) {
  return component.type.displayName || component.type.name;
};

var getComponentType = function getComponentType(component) {
  return getComponentName(component) || component.type;
};

var getComponentProp = function getComponentProp(component, prop) {
  return stringifyItem(getProps(component)[prop]);
};

var appendStringifiedProp = function appendStringifiedProp(component) {
  return function (accumulated, prop) {
    return accumulated + ' ' + prop + '="' + getComponentProp(component, prop) + '"';
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

var stringifyFunction = function stringifyFunction(value) {
  return value.toString().replace(/ {[\s\S]*/, '{ ... }');
};

var stringifyValue = function stringifyValue(value) {
  switch (typeof value) {
    case 'function':
      return stringifyFunction(value);
    case 'object':
      return (0, _stringifyObject2['default'])(value, { indent: ' ' }).replace(/\n|  /g, '');
    default:
      return value.toString();
  }
};

var stringifyItem = function stringifyItem(item) {
  return _reactAddons2['default'].addons.TestUtils.isElement(item) ? stringifyComponent(item) : stringifyValue(item);
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
