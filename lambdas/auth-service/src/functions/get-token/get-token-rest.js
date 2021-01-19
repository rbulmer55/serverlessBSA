import { getToken } from './get-token';
import { initLogger, logger } from '@bsa/logger';

export async function getTokenRest(event) {
  try {
    initLogger('@bsa.lambdas.getToken');

    const {
      requestContext: { requestId: correlationId },
    } = event;

    const payload = {
      correlationId,
    };

    const result = await getToken(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello get token lambda',
        token: result,
      }),
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
