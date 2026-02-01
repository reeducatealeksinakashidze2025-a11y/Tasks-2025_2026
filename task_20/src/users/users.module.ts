import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { GetUserAgentMiddleware } from "src/middlewares/get-user-agent.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/users.schema";


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:User.name, schema:UserSchema }
        ])
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports: [UsersService, MongooseModule]
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