import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateUserDTO;
