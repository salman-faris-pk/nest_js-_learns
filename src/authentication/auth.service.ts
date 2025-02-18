import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs"
import { RegisterDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";


@Injectable()
export class AuthService{

    constructor(
      private readonly prismaservice: PrismaService,
      private jwtservice:JwtService,
      private readonly userservice:UsersService
    ){}

    async login(loginData:LoginDto): Promise<any>{

        const {username,password}=loginData;

        const users=await this.prismaservice.users.findUnique({
            where:{username}
        });

        if(!users){
            throw new NotFoundException('user not found')
        };

        const validatepassword= await bcrypt.compare(password,users.password)

        if(!validatepassword){
            throw new NotFoundException('invalid password!')
        };

        return {
            token: this.jwtservice.sign({username})
        }
    }



    async Register(registerData:RegisterDto):Promise<any>{

        const hashedPassword = await bcrypt.hash(registerData.password, 10);

        const user = await this.userservice.createUser({
            email: registerData.email,
            name: registerData.name,
            username: registerData.username,
            password: hashedPassword,
        });

        console.log(user);
        
    
       return {
        token: this.jwtservice.sign({username:user.username})
       }

    }

};