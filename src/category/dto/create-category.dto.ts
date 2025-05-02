import { ApiProperty } from "@nestjs/swagger"
import { ProductType } from "@prisma/client"
import { IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @ApiProperty({example: "Earphone"})
    name: string

    @ApiProperty({
        example: ProductType.PHONES,
        enum: ProductType,
    })
    type: ProductType
}
