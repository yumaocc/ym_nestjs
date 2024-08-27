import * as _colors from 'colors';
import { SetMetadata } from '@nestjs/common';

export const colors = _colors;

// 公共模块装饰器
export const Public = () => SetMetadata('isPublic', true);
