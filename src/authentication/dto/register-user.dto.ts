import { IsString, Length } from "class-validator";




export class RegisterDto {
    @IsString()
    @Length(5,10)
    name:string;

    @IsString()
    @Length(5,10)
    username: string;

    @IsString()
    @Length(5,15)
    email:string;

    @IsString()
    @Length(5,12)
    password:string;
}