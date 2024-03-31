import { StatusCode } from '../../utils/contraints/status-code';

export class ValidationException extends Error {
  statusCode: number;
  details: object;

  constructor({
    statusCode = StatusCode.BAD_REQUEST,
    message,
    details,
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'ValidationException';
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

export class DatabaseException extends Error {
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
    this.name = 'DatabaseError';
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, DatabaseException.prototype);
  }
}

export class ExternalRequestException extends Error {
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
    this.name = 'ExternalRequestError';
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, ExternalRequestException.prototype);
  }
}

export class NotFoundException extends Error {
  statusCode: number;
  details: object;

  constructor({
    statusCode = StatusCode.NOT_FOUND,
    message,
    details,
  }: {
    statusCode?: number;
    message: string;
    details?: object;
  }) {
    super();
    this.statusCode = statusCode;
    this.name = 'NotFoundException';
    this.message = message;
    this.details = details;
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
