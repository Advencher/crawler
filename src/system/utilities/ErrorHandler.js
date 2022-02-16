class ErrorHandler {
    async handleError(err) {
      await logger.error(
        'Error message from the centralized error-handling component',
        err,
      );
      await sendMailToAdminIfCritical();
      await sendEventsToSentry();
    }
    
    isTrustedError(error) {
      if (error instanceof BaseError) {
        return error.isOperational;
      }
      return false;
    }
   }
export const errorHandler = new ErrorHandler();