import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class NoValidUserResponse {
  @ApiProperty({ example: '40*' })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ example: ['% must be an %']})
  @IsArray()
  message: string[];

  @ApiProperty({ example: 'Error message' })
  @IsString()
  error: string;
}
