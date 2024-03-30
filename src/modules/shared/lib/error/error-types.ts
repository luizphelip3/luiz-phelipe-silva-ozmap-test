import { StatusCode } from "../../utils/contraints/status-code";

export class ValidationError extends Error {
  statusCode: number;
  details: object;

  constructor({
    statusCode = StatusCode.BAD_REQUEST,
    message,
    details
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'ValidationError'
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class DatabaseError extends Error {
  statusCode: number;
  details: object;
  

  constructor({
    statusCode = StatusCode.INTERNAL_SERVER_ERROR,
    message,
    details
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'DatabaseError'
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class ExternalRequestError extends Error {
  statusCode: number;
  details: object;

  constructor({
    statusCode = StatusCode.INTERNAL_SERVER_ERROR,
    message,
    details,
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'ExternalRequestError'
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, ExternalRequestError.prototype);
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  details: object;

  constructor({
    statusCode = StatusCode.NOT_FOUND,
    message,
    details
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'NotFoundError'
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
