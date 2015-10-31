'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _jsBeautify = require('js-beautify');

var _stringifyObject = require('./stringify-object');

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var getProps = function getProps(component) {
  return (0, _objectAssign2['default'])(component._store.originalProps, (0, _objectAssign2['default'])(getAttribute('key', component), getAttribute('ref', component)));
};

var getAttribute = function getAttribute(attribute, component) {
  return component[attribute] ? _defineProperty({}, attribute, component[attribute]) : {};
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

var getPropValue = function getPropValue(component, prop) {
  return getProps(component)[prop];
};

var getFormatedPropValue = function getFormatedPropValue(propValue) {
  return typeof propValue === 'string' ? '"' + stringifyItem(propValue) + '"' : '{' + stringifyItem(propValue) + '}';
};

var getComponentProp = function getComponentProp(component, prop) {
  return getFormatedPropValue(getPropValue(component, prop));
};

var appendStringifiedProp = function appendStringifiedProp(component) {
  return function (accumulated, prop) {
    return accumulated + ' ' + prop + '=' + getComponentProp(component, prop);
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

var isReact = _reactAddons2['default'].addons.TestUtils.isElement;

var stringifyItem = function stringifyItem(item) {
  return isReact(item) ? stringifyComponent(item) : stringifyValue(item);
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
