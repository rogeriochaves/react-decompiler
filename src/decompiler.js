import React from 'react/addons';
import {html as htmlBeautify} from 'js-beautify';

const getProps = component => component._store.originalProps;

const getChildren = component => getProps(component).children;

const getPropsKeys = component =>
  Object.keys(getProps(component)).filter(prop => prop !== 'children');

const getComponentName = component =>
  component.type.displayName || component.type.name;

const getComponentType = component =>
  getComponentName(component) || component.type;

const appendStringifiedProp = component => (accumulated, prop) =>
  `${accumulated} ${prop}="${getProps(component)[prop]}"`;

const stringifyProps = component =>
  getPropsKeys(component).reduce(appendStringifiedProp(component), '');

const stringifyComposedComponent = component =>
  `<${getComponentType(component)}${stringifyProps(component)}>${stringifyItems(getChildren(component))}</${getComponentType(component)}>`;

const stringifySimpleComponent = component =>
  `<${getComponentType(component)}${stringifyProps(component)} />`;

const stringifyComponent = component =>
  getChildren(component) ? stringifyComposedComponent(component) : stringifySimpleComponent(component);

const stringifyItem = item =>
  React.addons.TestUtils.isElement(item) ? stringifyComponent(item) : item.toString();

const stringifyItems = components =>
  [].concat(components).map(stringifyItem).join('');

export const decompile = stringifyItems;

export const formatted = (items) => htmlBeautify(stringifyItems(items), { indent_size: 2 });
