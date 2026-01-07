import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { GetUserAgentMiddleware } from "src/middlewares/get-user-agent.middleware";


@Module({
    imports:[],
    controllers:[UsersController],
    providers:[UsersService],
    exports: [UsersService]
})
export class   UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(GetUserAgentMiddleware)
        // .forRoutes('/users')
        // .forRoutes(UsersController)
        //  .exclude({path:'/users',method:RequestMethod.DELETE})
        //   .forRoutes({path:'/users',method:RequestMethod.POST})

    }
}