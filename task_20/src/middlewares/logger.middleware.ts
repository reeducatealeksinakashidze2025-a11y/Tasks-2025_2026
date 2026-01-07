import { NextFunction, Request, Response } from "express";


export function loggerMiddleware(req: Request, res:Response,next:NextFunction){
console.log('logger middleware', req.url,req.method)
next()
}