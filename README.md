# react-decompiler [![build-status](https://snap-ci.com/rogeriochaves/react-decompiler/branch/master/build_image.svg)](https://snap-ci.com/rogeriochaves/react-decompiler/branch/master)

Decompiles react components back into jsx strings.

Install react-decompiler
```
npm install react-decompiler
```

Use it
```javascript
import {decompile} from 'react-decompiler';

let component = (<div>
    <h1>Hello</h1>
</div>);

decompile(component);

// Outputs: "<div><h1>Hello</h1></div>"
```

You can also output it nicely formatted
```javascript
import {formatted} from 'react-decompiler';

let component = (<div>
    <h1>Hello</h1>
</div>);

formatted(component);

// Outputs: "<div>
//  <h1>Hello</h1>
// </div>"
```

See more examples on the [test file](https://github.com/rogeriochaves/react-decompiler/blob/master/test/decompiler_spec.js)
