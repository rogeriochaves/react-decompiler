var React = require('react/addons');
var decompiler = require('decompiler');

describe('decompiler', function() {
  it('returns the string representation of a simple component', function () {
    var component = <div />

    expect(decompiler(component)).toBe('<div />');
  });
});
