import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Buffer } from '../../decarators/buffer.decarator';
import { UploaderService } from './uploader.service';
import { IsImage } from '../../decarators/is-image.decarator';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadResult } from './upload-result';

@Controller()
@ApiTags('Uploader')
export class UploaderController {
  constructor(private uploaderService: UploaderService) {}

  @Post(':filename')
  @ApiConsumes('image/jpg', 'image/png')
  @ApiBody({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiResponse({ type: [UploadResult] })
  async uploadFile(
    @Param('filename') filename: string,
    @Buffer() file: Buffer,
    @IsImage() isImage: boolean,
  ) {

    return this.uploaderService.upload(filename, file, isImage);
  }
}
