import { ApiProperty } from "@nestjs/swagger"
import { ProductCondition, ProductType } from "@prisma/client"
import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    @ApiProperty({example: "Iphone 14"})
    name: string

    @IsString()
    @ApiProperty({example: "The best of the best"})
    description: string

    @IsNumber()
    @ApiProperty({example: 10})
    count: number

    @IsString()
    @ApiProperty({example: "asdffghjk.jpg"})
    image: string

    @IsString()
    @ApiProperty({example: "c9f79b23-46ad-485c-9fd8-2fadb428ea46"})
    category_id: string

    @IsNumber()
    @ApiProperty({example: 10})
    discount: number

    @IsNumber()
    @ApiProperty({example: 1000})
    price: number

    @ApiProperty({
        example: ProductType.PHONES,
        enum: ProductType,
    })
    type: ProductType


    @ApiProperty({
        example: ProductCondition.NEW,
        enum: ProductCondition,
    })
    condition: ProductCondition


    @ApiProperty({example: ["uuid-1", "uuid-2", "uuid-3"]})
    colors: string[]
}
