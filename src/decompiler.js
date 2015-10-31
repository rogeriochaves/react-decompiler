import React from 'react/addons';
import {html as htmlBeautify} from 'js-beautify';
import stringifyObject from 'stringify-object';
import merge from 'object-assign';

const getProps = component =>
  merge(component._store.originalProps, getKey(component));

const getKey = component =>
  component.key ? {key: component.key} : {};

const getChildren = component => getProps(component).children;

const getPropsKeys = component =>
  Object.keys(getProps(component)).filter(prop => prop !== 'children');

const getComponentName = component =>
  component.type.displayName || component.type.name;

const getComponentType = component =>
  getComponentName(component) || component.type;

const getComponentProp = (component, prop) =>
  stringifyItem(getProps(component)[prop])

const appendStringifiedProp = component => (accumulated, prop) =>
  `${accumulated} ${prop}="${getComponentProp(component, prop)}"`;

const stringifyProps = component =>
  getPropsKeys(component).reduce(appendStringifiedProp(component), '');

const stringifyComposedComponent = component =>
  `<${getComponentType(component)}${stringifyProps(component)}>${stringifyItems(getChildren(component))}</${getComponentType(component)}>`;

const stringifySimpleComponent = component =>
  `<${getComponentType(component)}${stringifyProps(component)} />`;

const stringifyComponent = component =>
  getChildren(component) ? stringifyComposedComponent(component) : stringifySimpleComponent(component);

const stringifyFunction = value =>
  value.toString().replace(/ {[\s\S]*/, '{ ... }')

const stringifyValue = value => {
  switch (typeof value) {
    case 'function': return stringifyFunction(value);
    case 'object': return stringifyObject(value, {indent: ' '}).replace(/\n|  /g, '');
    default: return value.toString();
  }
}

const stringifyItem = item =>
  React.addons.TestUtils.isElement(item) ? stringifyComponent(item) : stringifyValue(item);

const stringifyItems = components =>
  [].concat(components).map(stringifyItem).join('');

export const decompile = stringifyItems;

export const formatted = (items) => htmlBeautify(stringifyItems(items), { indent_size: 2 });
