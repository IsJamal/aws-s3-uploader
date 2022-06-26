import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UploaderController } from './uploader.controller';
import { BufferParserMiddleware } from '../../middlewares/buffer-parser.middleware';
import { AwsS3Service } from './aws-s3.service';
import { UploaderService } from './uploader.service';
import { TypeCheckerMiddleware } from '../../middlewares/type-checker.middleware';

@Module({
  providers: [AwsS3Service, UploaderService],
  controllers: [UploaderController],
})
export class UploaderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BufferParserMiddleware).forRoutes(UploaderController);
    consumer.apply(TypeCheckerMiddleware).forRoutes(UploaderController);
  }
}
