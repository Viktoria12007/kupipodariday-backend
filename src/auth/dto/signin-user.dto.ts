import { ApiProperty, PickType } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

export class SigninUserResponseDto {
  @ApiProperty({ description: 'Access token', example: '13213sdf4325fvgbcvbsdf' })
  access_token: string;
}

export class SigninUserDto extends PickType(User, ['username', 'password']) {}
