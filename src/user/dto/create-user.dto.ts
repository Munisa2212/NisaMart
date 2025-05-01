import { rolesEnum } from "../enum/role.enum"

export class CheckingDto {
    phone: string
}

export class RegisterUserDto {
    image: string
    first_name: string
    last_name: string
    region_id: string
    year: number
    email: string
    password: string
    role: rolesEnum
}

export class LoginUserDto {
    email: string
    password: string
}

