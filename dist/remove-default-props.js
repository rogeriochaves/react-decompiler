'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _reactAddonsTestUtils = require('react-addons-test-utils');

exports['default'] = function (components) {
  return [].concat(components).map(removeDefaultPropsIfReact);
};

var removeDefaultPropsIfReact = function removeDefaultPropsIfReact(item) {
  return (0, _reactAddonsTestUtils.isElement)(item) ? removeComponentDefaultProps(item) : item;
};

var removeComponentDefaultProps = function removeComponentDefaultProps(component) {
  return _extends({}, component, { props: filterDefaultProps(component) });
};

var filterDefaultProps = function filterDefaultProps(component) {
  return Object.keys(component.props).reduce(addPropIfNotDefault(component), {});
};

var addPropIfNotDefault = function addPropIfNotDefault(component) {
  return function (accumulated, prop) {
    return isDefaultProp(component, prop) ? accumulated : _extends({}, accumulated, _defineProperty({}, prop, removeDefaultPropsIfReact(component.props[prop])));
  };
};

var isDefaultProp = function isDefaultProp(component, prop) {
  return component.type.defaultProps && component.props[prop] === component.type.defaultProps[prop];
};
module.exports = exports['default'];