import { translation } from './translation';
import { initLogger, logger } from '@bsa/logger';

export async function translationRest(event) {
  try {
    initLogger('@bsa.lambdas.translation');

    const {
      requestContext: { requestId: correlationId },
      body,
    } = event;

    const payloadBody = JSON.parse(body);

    const payload = {
      ...payloadBody,
      correlationId,
    };

    const result = await translation(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello translation lambda', result }),
    };
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An internal error occurred. Please try again later',
      }),
    };
  }
}
