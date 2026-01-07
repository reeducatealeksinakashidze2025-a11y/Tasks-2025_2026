import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserQueryDto } from "src/users/dto/user-query.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SubscriptionGuard implements CanActivate {
      constructor(private readonly usersService: UsersService) {}
   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req  = context.switchToHttp().getRequest();
    const email = req .headers['email'];

    if (!email) {
      req.isSubscriptionActive = false;
      return true;
    }

    const users =  this.usersService.getAllUsers(new UserQueryDto()); 
    const user = users?.find(u => u.email === email);

    if (!user || !user.subscriptionStartDate || !user.subscriptionEndDate) {
      req .isSubscriptionActive = false;
      return true;
    }

    const now = new Date();
    const isActive = now >= user.subscriptionStartDate && now <= user.subscriptionEndDate;

    req.isSubscriptionActive = isActive;

    return true;
  }
}