import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as imageType from 'image-type';

export const IsImage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.buffer ? !!imageType(request.buffer) : false;
  },
);
