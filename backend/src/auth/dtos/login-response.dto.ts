export class LoginResponseDto {
  accesToken: string;
  user: {
    id: number;
    email: string;
    roles: string[];
  };
}
