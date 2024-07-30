import { IsUUID, IsNotEmpty, IsNumber, Min } from 'class-validator';

class CreateProducerCropDTO {
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

export default CreateProducerCropDTO;
