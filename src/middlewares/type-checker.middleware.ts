import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { FileConfig } from '../config/file-config';
import { extname } from 'path';

@Injectable()
export class TypeCheckerMiddleware implements NestMiddleware {
  private fileConfig: FileConfig;
  constructor(private config: ConfigService) {
    this.fileConfig = this.config.get<FileConfig>('file');
  }
  use(req: Request, res: Response, next: NextFunction) {
    if (!req['buffer'] || !req['buffer'].length)
      throw new HttpException(
        { message: 'File required' },
        HttpStatus.BAD_REQUEST,
      );
    const contentType = req.header('Content-Type');
    if (!this.fileConfig.validContentTypes.includes(contentType)) {
      throw new HttpException(
        { message: 'Content type not allowed' },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    const ext = extname(req.params.filename);
    if (!this.fileConfig.validExtensions.includes(ext)) {
      throw new HttpException(
        { message: 'File name is not valid' },
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    next();
  }
}
