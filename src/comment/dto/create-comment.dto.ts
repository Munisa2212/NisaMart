import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateCommentDto {
    @IsString()
    @ApiProperty({example: "asdfghjkl"})
    product_id: string

    @IsString()
    @ApiProperty({example: "The best of the best"})
    comment: string

    @IsNumber()
    @ApiProperty({example: 3, maximum: 5, minimum: 1})
    star: number
}
