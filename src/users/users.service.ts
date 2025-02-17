import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    async getAllUser():Promise<Users[]>{
        return this.prisma.users.findMany()
    }
}
