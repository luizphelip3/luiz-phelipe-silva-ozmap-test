import { StatusCode } from "../contraints/status-code";

export class ValidationError extends Error {
  statusCode: number;

  constructor({
    statusCode = StatusCode.BAD_REQUEST,
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
    statusCode = StatusCode.INTERNAL_SERVER_ERROR,
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
