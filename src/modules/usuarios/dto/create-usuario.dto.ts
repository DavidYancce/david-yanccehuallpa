import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  codigoTrabajador: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correoElectronico: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  puesto: string;

  @IsInt()
  rolId: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
