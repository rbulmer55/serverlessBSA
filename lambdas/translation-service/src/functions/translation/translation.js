import { parseStringPromise } from 'xml2js';
import { logger } from '@bsa/logger';
import { myTest } from '@bsa/test';

export async function translation({ data, correlationId }) {
  const x = myTest();
  console.log(x); // show ts packages

  const additionalLoggerInfo = {
    correlationId,
  };

  const jsonData = await parseStringPromise(data);
  logger.info(JSON.stringify(jsonData), additionalLoggerInfo);
  return jsonData;
}
