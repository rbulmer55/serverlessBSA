# @bsa/errors library

> Universal errors package

## BadRequest

The **BadRequest** class extends the Error object and outputs many possible errors from failed request validation.

```javascript
import { BadRequest } from '@bsa/errors';

throw new BadRequest('a bad request occurred', { ...args });
```
