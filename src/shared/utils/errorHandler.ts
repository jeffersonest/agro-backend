import { ValidationError } from 'class-validator';

class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handle(error: any): { statusCode: number; body: any } {
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
      const formattedErrors = error.map((validationError) => ({
        property: validationError.property,
        constraints: Object.values(validationError.constraints || {}),
      }));
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
