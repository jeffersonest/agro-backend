import { IsUUID, IsNotEmpty, IsNumber, Min } from 'class-validator';

class UpdateProducerCropDTO {
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @IsUUID()
  @IsNotEmpty()
  cropId: string;

  @IsNumber()
  @Min(0)
  area: number;
}

export default UpdateProducerCropDTO;
