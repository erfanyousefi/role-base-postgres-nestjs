import { ApiProperty } from "@nestjs/swagger";

export class RoleIdDTO {
    @ApiProperty({type: "integer"})
    roleID: number
}