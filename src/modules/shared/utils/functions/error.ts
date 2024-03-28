export class ValidationError extends Error {
  statusCode: number;

  constructor({
    statusCode = 400,
    message,
  }: {
    statusCode?: number;
    message: any;
  }) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class DatabaseError extends Error {
  statusCode: number;

  constructor({
    statusCode = 500,
    message,
  }: {
    statusCode?: number;
    message: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
