import { createLogger } from 'winston';
import { logger, initLogger } from '../index';

describe('@bsa/logger', () => {
  describe('logger', () => {
    it('should throw error if initLogger has not been called when using info method', () => {
      expect(() => {
        logger.info('os-service');
      }).toThrow(/Logger must be created before use./);
    });

    it('should throw error if initLogger has not been called when using warn method', () => {
      expect(() => {
        logger.warn('os-service');
      }).toThrow(/Logger must be created before use./);
    });

    it('should throw error if initLogger has not been called when using error method', () => {
      expect(() => {
        logger.error('os-service');
      }).toThrow(/Logger must be created before use./);
    });
  });

  describe('initLogger', () => {
    it('should not call createLogger a second time if it has already been called', () => {
      initLogger('test-service');
      initLogger('test-service'); // call a second time should just return the same logger instance

      expect(createLogger).toHaveBeenCalledTimes(1);
    });
  });
});
