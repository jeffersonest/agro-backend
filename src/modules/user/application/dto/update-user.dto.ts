import { IsEmail } from 'class-validator';

class UpdateUserDTO {
  @IsEmail()
  email?: string;

  password?: string;
  name?: string;
}

export default UpdateUserDTO;
