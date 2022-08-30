import { Module } from '@nestjs/common';
import { Privacy } from 'src/privacy/privacy.model';
import { User } from 'src/user/user.model';
import { PostController } from './post.controller';
import { Post } from './post.model';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [Post, Privacy, User]
})
export class PostModule {}
