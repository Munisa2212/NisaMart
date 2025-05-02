import { ApiProperty } from "@nestjs/swagger"
import { rolesEnum } from "../enum/role.enum"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CheckingDto {
    @IsEmail()
    @ApiProperty({example: "ibodullayevamunisa570@gmail.com"})
    email: string

    @IsString()
    @ApiProperty({example: "+998882452212"})
    phone: string
}

export class VerifyOTPDto {
    @IsEmail()
    @ApiProperty({example: "ibodullayevamunisa570@gmail.com"})
    email: string

    @IsString()
    @ApiProperty({example: "12345"})
    otp: string
}

export class RegisterUserDto {
    @IsString()
    @ApiProperty({example: "xdfghjkhgfdsxccvbn.jpg"})
    image: string

    @IsString()
    @ApiProperty({example: "Munisa"})
    first_name: string

    @IsString()
    @ApiProperty({example: "Ibodullayeva"})
    last_name: string

    @IsString()
    @ApiProperty({example: "1"})
    region_id: string

    @IsNumber()
    @ApiProperty({example: 2005})
    year: number

    @IsString()
    @ApiProperty({example: "ibodullayevamunisa570@gmail.com"})
    email: string

    @IsString()
    @ApiProperty({example: "Hello22"})
    password: string

    @ApiProperty({example: "USER"})
    role: rolesEnum

    @IsString()
    @ApiProperty({example: "+998882452212"})
    phone: string
}

export class LoginUserDto {
    @IsString()
    @ApiProperty({example: "ibodullayevamunisa570@gmail.com"})
    email: string

    @IsString()
    @ApiProperty({example: "Hello22"})
    password: string
}

