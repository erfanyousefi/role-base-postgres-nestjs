import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export default class LoginDTO {
    @ApiProperty({default: "example@domain.com", required: true})
    @IsEmail()
    email: string;
    @ApiProperty({default: "12345678", format: "password", required: true})
    @Length(8, 16)
    password: string;
}