export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationException extends Error {
  errors: ValidationError[];
  isValidationError: boolean;

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.errors = errors;
    this.isValidationError = true;
  }
}
