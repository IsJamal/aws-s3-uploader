export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  file: {
    maxSize: process.env.MAX_FILE_SIZE || '5mb',
    validExtensions: process.env.VALID_FILE_EXTENSIONS?.split(' '),
    validContentTypes: process.env.VALID_CONTENT_TYPES?.split(' '),
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
});
