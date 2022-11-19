import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, Length, Min } from "class-validator";
import { ROLE } from "src/common/enums/role.enum";

export class CreateRoleDto {
    @IsNotEmpty()
    @ApiProperty({default: ROLE.USER, type: "enum", enum: ROLE})
    title: ROLE

    @IsNumberString({allowInfinity: false})
    @ApiProperty({default: 1, type: "integer"})
    userID: number
}
