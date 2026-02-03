import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers['authorization'];
    console.log(authorization);
    if (!authorization) throw new UnauthorizedException('permition deniedddd');
    const [type, token] = authorization.split(' ');
    console.log(token);
    if (!token) throw new UnauthorizedException('permition deniedeeee');

    try {
      const payload = this.jwtService.verify(token);
        req.user = payload;
      console.log('payload', payload);
      return true;
    } catch (e) {
      throw new UnauthorizedException('permition deniedaaaaa');
    }
  }
}
