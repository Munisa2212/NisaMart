import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
    @IsString()
    @ApiProperty({example: "1"})
    product_id: string

    @IsNumber()
    @ApiProperty({example: 10})
    count: number

    @IsString()
    @ApiProperty({example: "1"})
    color_id: string
}
