import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CelestialPostModule } from './celestial-post/celestial-post.module';
import { AuthModule } from './auth/auth.module';
import { PostLikeModule } from './post-like/post-like.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'sequelize',
      username: 'postgres',
      password: 'root',
      autoLoadModels: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      playground: true,
      path: '/graphql',
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    UserModule,
    CelestialPostModule,
    AuthModule,
    // PostLikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
