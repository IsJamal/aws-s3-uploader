import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Buffer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.buffer || null;
  },
);
