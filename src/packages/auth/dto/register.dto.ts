import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export default class RegisterDTO {
    @ApiProperty({default: "Erfan"})
    @IsNotEmpty()
    @Length(3)
    firstName: string;
    @ApiProperty({default: "Yousefi"})
    @IsNotEmpty()
    @Length(3)
    lastName: string;
    @ApiProperty({default: "example@domain.com"})
    @IsEmail()
    email: string;
    @ApiProperty({default: "12345678", format: "password"})
    @Length(8, 16)
    password: string;
}