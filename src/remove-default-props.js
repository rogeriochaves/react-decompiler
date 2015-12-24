import {isElement as isReact} from 'react-addons-test-utils';

export default (components) =>
  [].concat(components).map(removeDefaultPropsIfReact)

const removeDefaultPropsIfReact = (item) =>
  isReact(item) ? removeComponentDefaultProps(item) : item;

const removeComponentDefaultProps = (component) =>
  ({...component, props: filterDefaultProps(component)});

const filterDefaultProps = (component) =>
  Object.keys(component.props).reduce(addPropIfNotDefault(component), {});

const addPropIfNotDefault = (component) => (accumulated, prop) =>
  isDefaultProp(component, prop) ? accumulated :
    {...accumulated, [prop]: removeDefaultPropsIfReact(component.props[prop])};

const isDefaultProp = (component, prop) =>
  component.type.defaultProps && component.props[prop] === component.type.defaultProps[prop];
