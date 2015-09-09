import React from 'react/addons';
import {decompile, formatted} from 'decompiler';

describe('decompiler', () => {

  class Foo extends React.Component {
    render () {
      return (<span>
        <div>
          <span>
            <div>
              Something
            </div>
          </span>
        </div>
      </span>);
    }
  };

  it('stringify a simple component', () => {
    let component = <div />;

    expect(decompile(component)).toBe('<div />');
  });

  it('stringify a simple component with simple props', () => {
    let component = <div foo="bar" className="baz" />;

    expect(decompile(component)).toBe('<div foo="bar" className="baz" />');
  });

  it('stringify a simple component with interpolated props', () => {
    let component = <div qux={1 + 1} />;

    expect(decompile(component)).toBe('<div qux="2" />');
  });

  it('stringify composed components', () => {
    let component = (<div>
      <span />
    </div>);

    expect(decompile(component)).toBe('<div><span /></div>');
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

    expect(decompile(component)).toBe('<div><span><div /></span><section><hr /></section></div>');
  });

  it('stringify components with values inside', () => {
    let component = <div>Foo</div>;

    expect(decompile(component)).toBe('<div>Foo</div>');
  });

  it('stringify nested custom components', () => {
    let component = (<div>
      <Foo />
      <span>
        <Foo>5</Foo>
      </span>
    </div>);

    expect(decompile(component)).toBe('<div><Foo /><span><Foo>5</Foo></span></div>');
  });

  it('stringify components rendered with shallow rendering', () => {
    let renderer = React.addons.TestUtils.createRenderer();
    renderer.render(<Foo />);

    let output = renderer.getRenderOutput();

    expect(decompile(output)).toBe('<span><div><span><div>Something</div></span></div></span>');
  });

  it('stringify only first level components with shallow rendering', () => {
    let renderer = React.addons.TestUtils.createRenderer();
    renderer.render(<div><Foo /></div>);

    let output = renderer.getRenderOutput();

    expect(decompile(output)).toBe('<div><Foo /></div>');
  });

  it('outputs formatted html', () => {
    let component = (<div>
      <h1>Hello World</h1>
      <table>
        <tr>
          <td>
            <Foo />
          </td>
        </tr>
        <tr>
          <td>Foo Bar</td>
        </tr>
      </table>
    </div>);

    expect(formatted(component)).toBe(`<div>
  <h1>Hello World</h1>
  <table>
    <tr>
      <td>
        <Foo />
      </td>
    </tr>
    <tr>
      <td>Foo Bar</td>
    </tr>
  </table>
</div>`);
  });
});
