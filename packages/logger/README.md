# @bsa/logger library

> Universal logger package based off the Winston logger

## initLogger()

The **initLogger** method should be called to initialise the logger. It currently has two arguements:

**Service** (_Required_): This is the service label ie the service it is being initialised in.

**Level** (_Optional_): This is the minimum log level, with info being the default.

```javascript
import { initLogger } from '@bsa/logger';

// default call
initLogger('bsa.lambda.translation');

// or with specifying the log level (default is info)
initLogger('bsa.lambda.translation', 'error');
```

### logger()

The **logger** method should be used to log the required message.

It has three methods:

**info**: logger.info for logging info only.

**warn**: logger.info for logging warnings only.

**error**: logger.info for logging errors only.

```javascript
import { logger } from '@bsa/logger';

logger.info(
  `Correlation ID: ${correlationId} - Lambda: ${METHOD} - Translation request started`
);
```
