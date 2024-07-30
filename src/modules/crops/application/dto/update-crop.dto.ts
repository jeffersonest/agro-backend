import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

class UpdateCropDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}

export default UpdateCropDTO;
