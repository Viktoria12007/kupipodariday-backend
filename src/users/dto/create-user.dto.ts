export class CreateUserDto {
    id?: number;
    email: string;
    password: string;
    username: string;
    avatar?: string;
    about?: string;
}
