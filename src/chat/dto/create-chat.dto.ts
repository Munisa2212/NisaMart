import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateChatDto {
    @IsString()
    @ApiProperty({example: "1"})
    fromId: string

    @IsString()
    @ApiProperty({example: "2"})
    toId: string
}

export class CreateMessageDto {
    @IsString()
    @ApiProperty({example: "1"})
    fromId: string

    @IsString()
    @ApiProperty({example: "2"})
    toId: string

    @IsNumber()
    @ApiProperty({example: "1"})
    chatId: number

    createdAt: string

    @IsString()
    @ApiProperty({example: "hello"})
    message: string
}


