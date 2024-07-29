import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

class CreateProducerDTO {
  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  identification: string;

  @IsString()
  @IsNotEmpty()
  producerName: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  farmSize: number;

  @IsNumber()
  @IsNotEmpty()
  usableArea: number;

  @IsNumber()
  @IsNotEmpty()
  vegetationArea: number;
}

export default CreateProducerDTO;
