import React from 'react/addons';
import decompiler from 'decompiler';

describe('decompiler', () => {
  it('stringify a simple component', () => {
    let component = <div />;

    expect(decompiler(component)).toBe('<div />');
  });

  it('stringify a simple component with simple props', () => {
    let component = <div foo="bar" className="baz" />;

    expect(decompiler(component)).toBe('<div foo="bar" className="baz" />');
  });

  it('stringify a simple component with interpolated props', () => {
    let component = <div qux={1 + 1} />;

    expect(decompiler(component)).toBe('<div qux="2" />');
  });

  it('stringify composed components', () => {
    let component = (<div>
      <span />
    </div>);

    expect(decompiler(component)).toBe('<div><span /></div>');
  });

  it('stringify multiple nested composed components', () => {
    let component = (<div>
      <span>
        <div />
      </span>
      <section>
        <hr />
      </section>
    </div>);

    expect(decompiler(component)).toBe('<div><span><div /></span><section><hr /></section></div>');
  });

  it('stringify components with values inside', () => {
    let component = <div>Foo</div>;

    expect(decompiler(component)).toBe('<div>Foo</div>');
  });
});
