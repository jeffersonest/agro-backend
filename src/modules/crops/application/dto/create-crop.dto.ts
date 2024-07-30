import { IsNotEmpty, IsString } from 'class-validator';

class CreateCropDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateCropDTO;
