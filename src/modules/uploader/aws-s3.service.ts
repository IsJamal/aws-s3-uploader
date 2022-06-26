import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { AwsConfig } from '../../config/aws-config';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;
@Injectable()
export class AwsS3Service {
  private s3: S3;
  private awsConfig: AwsConfig;
  constructor(private config: ConfigService) {
    this.awsConfig = this.config.get<AwsConfig>('aws');
    this.s3 = new S3({
      accessKeyId: this.awsConfig.accessKey,
      secretAccessKey: this.awsConfig.secretKey,
    });
  }

  public upload(filename: string, file: Buffer) {
    const payload = {
      Bucket: this.awsConfig.s3.bucketName,
      Key: String(filename),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      this.s3.upload(payload, (err, data) => {
        if (err)
          return reject(
            new HttpException(
              { message: 'Cannot upload to AWS S3' },
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        resolve({ key: data.key });
      });
    });
  }
}
