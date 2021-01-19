import { logger } from '@bsa/logger';
import { sign } from 'jsonwebtoken';

export async function getToken({ correlationId }) {
  const additionalLoggerInfo = {
    correlationId,
  };

  logger.info('generating jwt token', additionalLoggerInfo);

  const user = {
    userId: 'baa6b809-f748-4183-82a4-89f894853004',
    email: 'tester@jwt-bsa.co.uk',
  };

  const token = sign(user, 'bsasecret', {
    audience: 'bsa/client',
    issuer: 'bsa/auth',
    algorithm: 'HS256',
    subject: user.userId,
    expiresIn: 86400,
  });

  return token;
}
