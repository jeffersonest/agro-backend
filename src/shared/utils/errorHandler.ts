import { ValidationError } from 'class-validator';

class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handle(error: any): { statusCode: number; body: any } {
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
      const formattedErrors = error.reduce(
        (acc, validationError) => {
          acc[validationError.property] = Object.values(
            validationError.constraints || {},
          ).join(', ');
          return acc;
        },
        {} as Record<string, string>,
      );
      return {
        statusCode: 400,
        body: { message: 'Validation Error', errors: formattedErrors },
      };
    }

    return {
      statusCode: 400,
      body: { message: (error as Error).message },
    };
  }
}

export default ErrorHandler;
