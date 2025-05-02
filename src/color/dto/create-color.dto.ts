import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateColorDto {
    @IsString()
    @ApiProperty({example: "Red"})
    name: string
}
