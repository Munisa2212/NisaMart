import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLikeDto {
    @IsString()
    @ApiProperty({example: "1"})
    product_id: string
}
