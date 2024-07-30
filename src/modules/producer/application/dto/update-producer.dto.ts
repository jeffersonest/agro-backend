import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Length,
  IsOptional,
} from 'class-validator';

class UpdateProducerDTO {
  @IsString()
  @IsOptional()
  @Length(11, 14)
  identification?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  producerName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  farmName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  state?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  farmSize?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  usableArea?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  vegetationArea?: number;
}

export default UpdateProducerDTO;
