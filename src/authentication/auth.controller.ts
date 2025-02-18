import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request,Response } from 'express';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  @Post('/login')
  async login(@Req() req:Request,@Res() res:Response,@Body() loginDto:LoginDto):Promise<any>{
    try {
        const result=await this.authService.login(loginDto);
        return res.status(200).json({mesage:"login successfull",result:result})
    } catch (err) {
        res.status(500).json({message: err || "internal sever error"})
    }
  }


  @Post('/register')
  async Register(@Req() req:Request,@Res() res:Response,@Body() registerDto:RegisterDto):Promise<any>{
    try {
        const result=await this.authService.Register(registerDto)
        return res.status(200).json({mesage:"registration successfull",result:result})
    } catch (err) {
        res.status(500).json({message: err || "internal sever error"})
    }
  }


}
