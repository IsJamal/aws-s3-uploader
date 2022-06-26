export interface AwsConfig {
  accessKey: string;
  secretKey: string;
  s3: {
    bucketName: string;
  };
}
