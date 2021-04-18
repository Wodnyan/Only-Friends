interface ValidationErrors {
  field: string;
  error: string;
}

export class ValidationException extends Error {
  errors: ValidationErrors[];

  constructor(message: string, errors: ValidationErrors[]) {
    super(message);
    this.errors = errors;
  }
}
