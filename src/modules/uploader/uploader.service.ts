import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import * as sharp from 'sharp';

enum Folders {
  LARGE = 'large',
  MEDIUM = 'medium',
  THUMB = 'thumb',
  OTHERS = 'others',
}

@Injectable()
export class UploaderService {
  constructor(private awsS3Service: AwsS3Service) {}

  private async resize(file: Buffer, dimension: number) {
    try {
      return await sharp(file)
        .resize(dimension, dimension, {
          fit: 'inside',
        })
        .toBuffer();
    } catch (e) {
      throw new HttpException(
        {
          message: 'Cannot process the image',
        },
        HttpStatus.PROCESSING,
      );
    }
  }

  public upload(filename: string, file: Buffer, isImage: boolean) {
    if (isImage) {
      return this.imageUpload(filename, file);
    } else {
      return this.awsS3Service
        .upload(`${Folders.OTHERS}/${filename}`, file)
        .then((result) => [result]);
    }
  }

  private async imageUpload(
    filename: string,
    file: Buffer,
    dimensions: number[] = [2048, 1024, 300],
  ) {
    const [large, medium, thumb] = await Promise.all(
      dimensions.map((dimension) => this.resize(file, dimension)),
    );
    return Promise.all([
      this.awsS3Service.upload(`${Folders.LARGE}/${filename}`, large),
      this.awsS3Service.upload(`${Folders.MEDIUM}/${filename}`, medium),
      this.awsS3Service.upload(`${Folders.THUMB}/${filename}`, thumb),
    ]);
  }
}
