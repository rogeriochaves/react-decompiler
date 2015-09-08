import React from 'react/addons';

const getProps = component => component._store.originalProps;

const getChildren = component => getProps(component).children;

const getPropsKeys = component =>
  Object.keys(getProps(component)).filter(prop => prop !== 'children');

const appendStringifiedProp = component => (accumulated, prop) =>
  `${accumulated} ${prop}="${getProps(component)[prop]}"`;

const stringifyProps = component =>
  getPropsKeys(component).reduce(appendStringifiedProp(component), '');

const stringifyComposedComponent = component =>
  `<${component.type}${stringifyProps(component)}>${stringifyItems(getChildren(component))}</${component.type}>`;

const stringifySimpleComponent = component =>
  `<${component.type}${stringifyProps(component)} />`;

const stringifyComponent = component =>
  getChildren(component) ? stringifyComposedComponent(component) : stringifySimpleComponent(component);

const stringifyItem = item =>
  React.addons.TestUtils.isElement(item) ? stringifyComponent(item) : item.toString();

const stringifyItems = components =>
  [].concat(components).map(stringifyItem).join('')

export default stringifyItems;
