import { parseStringPromise } from 'xml2js';
import { logger } from '@bsa/logger';

export async function translation({ data, correlationId }) {
  const additionalLoggerInfo = {
    correlationId,
  };

  const jsonData = await parseStringPromise(data);
  logger.info(JSON.stringify(jsonData), additionalLoggerInfo);
  return jsonData;
}
