import { parseString } from 'xml2js';
import { initLogger, logger } from '@bsa/logger';
import { myTest } from '@bsa/test';

export async function handler({ data }) {
  initLogger('@bsa.lambdas.translation');
  const x = myTest();
  console.log(x);
  try {
    const jsonData = parseString(data);
    logger.info(jsonData);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello translation lambda', jsonData }),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An internal error occurred. Please try again later',
      }),
    };
  }
}
