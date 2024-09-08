
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { MailService } from 'src/mail/mail.service';


// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     ConfigModule, // Ensure ConfigModule is imported
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('ACCESS_TOKEN'),
//         signOptions: { expiresIn: '60s' },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   exports: [TypeOrmModule],
//   controllers: [UserController],
//   providers: [JwtService, UserService],
// })
// export class UserModule {}



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule, // Ensure ConfigModule is imported
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [JwtService, UserService, MailService],
})
export class UserModule {}
