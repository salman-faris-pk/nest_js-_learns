import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get('/allusers')
    async getAllUsers(@Req() req:Request,@Res() res:Response):Promise<any>{
        try {
            const result=await this.userService.getAllUser();
            return res.status(200).json(result)
            
        } catch (error) {
            res.status(500).json({message: error || "internal sever error"})
            
        }
    }
}
