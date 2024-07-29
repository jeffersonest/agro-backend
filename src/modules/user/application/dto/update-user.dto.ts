import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}

export default UpdateUserDTO;
