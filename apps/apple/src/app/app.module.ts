import { Module } from '@nestjs/common';
import { FireBaseModule } from './firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    FireBaseModule.forRoot(),
    PostModule,
    PostsModule,
    UserModule,
    UsersModule,
  ],
})
export class AppModule {}
