import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El campo email no puede estar vacío' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo contraseña no puede estar vacío' })
  password: string;
}
