import { JwtPayload } from '../../utils/auth.util';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
