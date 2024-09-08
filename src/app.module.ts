import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService,  } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/users.module';
import { PaystackModule } from './paystack/paystack.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host:  configService.get<string>('DATABASE_DEV_HOST'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User],
        synchronize: false,
        migrations: ['src/migrations/*.ts'],
      }),
    }),
    UserModule,
    PaystackModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}