import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
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

    expect(decompile(component)).toBe('<div qux={2} />');
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

  describe('shallow rendering', () => {
    let renderer;

    beforeEach(() => renderer = ReactTestUtils.createRenderer());

    it('stringify components rendered', () => {
      renderer.render(<Foo />);

      let output = renderer.getRenderOutput();

      expect(decompile(output)).toBe('<span><div><span><div>Something</div></span></div></span>');
    });

    it('stringify only first level components', () => {
      let Bar = React.createClass({
        render: () => <Foo />
      });

      renderer.render(<Bar />);

      let output = renderer.getRenderOutput();

      expect(decompile(output)).toBe('<Foo />');
    });

    it('stringify components with the createClass syntax rendered', () => {
      let Bar = React.createClass({
        render: () => <div>Bar</div>
      });

      renderer.render(<Bar />);

      let output = renderer.getRenderOutput();

      expect(decompile(output)).toBe('<div>Bar</div>');
    });
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

  it('stringify components on props correctly', () => {
    let component = <div something={<Foo />} />;

    expect(decompile(component)).toBe('<div something={<Foo />} />');
  });

  it('stringify functions on props without their contents', () => {
    function callback (args) {
      doSomeStuff();
    }
    let component = <div callback={callback} />;

    expect(decompile(component)).toBe('<div callback={function callback(args){ ... }} />');
  });

  it('stringify objects', () => {
    let obj = {foo: 'bar', baz: function qux () { doSomeStuff(); } };
    obj.self = obj;
    let component = <div something={obj} />;

    expect(decompile(component)).toBe(`<div something={{ foo: 'bar', baz: function qux() {doSomeStuff();}, self: "[Circular]"}} />`);
  });

  it('stringify array', () => {
    let component = <div something={[1, 'x', {a: 'b'}]} />;

    expect(decompile(component)).toBe(`<div something={[ 1, 'x', {a: 'b' }]} />`);
  });

  it('stringify numbers', () => {
    let component = <div value={124.5} />;

    expect(decompile(component)).toBe(`<div value={124.5} />`);
  });

  it('stringify key prop', () => {
    let component = (
      <ul>
        <li key="1" foo="bar">a</li>
        <li key="2">b</li>
      </ul>
    );

    expect(decompile(component)).toBe(`<ul><li key="1" foo="bar">a</li><li key="2">b</li></ul>`);
  });

  it('stringify ref prop', () => {
    let component = <div ref="foo" />;

    expect(decompile(component)).toBe(`<div ref="foo" />`);
  });

  it('stringify react elements inside plain old javascript objects', () => {
    let component = <div foo={[<span />, <div />]} />;

    expect(decompile(component)).toBe(`<div foo={[ <span />, <div />]} />`);
  });
});
