import { Global, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/modules/user.module';
import { RolesGuard } from '../guards/roles.guard';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, AuthenticationGuard],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  exports: [AuthenticationGuard, RolesGuard, JwtModule],
})
export class AuthModule {}
