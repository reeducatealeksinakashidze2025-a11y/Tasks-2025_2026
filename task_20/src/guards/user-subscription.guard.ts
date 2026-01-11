import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const email = req.headers['email'];

    if (!email) {
      req.isSubscriptionActive = false;
      return true;
    }

    const user = await this.usersService.findByEmail(email);

    if (!user || !user.subscriptionStartDate || !user.subscriptionEndDate) {
      req.isSubscriptionActive = false;
      return true;
    }

    const now = new Date();
    const isActive =
      now >= user.subscriptionStartDate && now <= user.subscriptionEndDate;

    req.isSubscriptionActive = isActive;

    return true;
  }
}
