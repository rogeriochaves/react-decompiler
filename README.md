# react-decompiler

Decompiles react components back into jsx strings.

Install react-decompiler
`npm install react-decompiler`

Use it
```javascript
import decompiler from 'react-decompiler';

let component = (<div>
    <h1>Hello</h1>
</div>);

decompiler(component);

// Outputs: <div><h1>Hello</h1></div>
```

You can also output it nicely formatted
```javascript
import {formatted} from 'react-decompiler';

let component = (<div>
    <h1>Hello</h1>
</div>);

formatted(component);

// Outputs: <div>
//  <h1>Hello</h1>
// </div>
```
