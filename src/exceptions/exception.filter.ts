import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  setReponse(
    response: Response,
    status: number,
    message: string,
    code: string,
    errors: any,
  ) {
    response.status(status).json({
      status,
      message,
      code,
      errors,
    });
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    this.logger.error({ exception, request, response, status });

    response.status(status).json({
      status,
      message,
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
}
