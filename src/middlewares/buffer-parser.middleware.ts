import { Injectable, NestMiddleware } from '@nestjs/common';
import { raw } from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { FileConfig } from '../config/file-config';

@Injectable()
export class BufferParserMiddleware implements NestMiddleware {
  private readonly fileConfig: FileConfig;
  constructor(private config: ConfigService) {
    this.fileConfig = this.config.get<FileConfig>('file');
  }

  use(req: any, res: any, next: () => void): any {
    raw({
      verify: (req, res, buffer) => {
        req['buffer'] = buffer;
      },
      type: '*/*',
      limit: this.fileConfig.maxSize,
    })(req, res as any, next);
  }
}
