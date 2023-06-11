import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaException implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.getErrorMessage(exception);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }

  private getErrorMessage(exception: PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2002':
        return 'The value provided for a unique field already exists.';
      case 'P2016':
        return 'The record you are trying to update was not found.';
      case 'P2025':
        return 'The query did not return any results.';
      default:
        return 'Error processing request.';
    }
  }
}
