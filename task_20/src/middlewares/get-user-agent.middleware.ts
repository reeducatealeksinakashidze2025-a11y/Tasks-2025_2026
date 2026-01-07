import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";


export class GetUserAgentMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log(req.headers['user-agent'])
        next()
    }
}