import { ApiProperty } from '@nestjs/swagger';

export class UploadResult {
  @ApiProperty()
  key: string;
}
