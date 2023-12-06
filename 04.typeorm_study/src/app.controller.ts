import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      email: '1234@gmail.com',
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져오게된다.
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        version: true,
        profile: {
          id: true,
        },
      },
      // 필터링할 조건을 입력하게된다.
      // {} -> AND
      // [] -> OR
      // where: {
      //   profile: {
      //     id: 2,
      //   },
      // },
      // 관계를 가져오는 법
      relations: {
        profile: true,
      },
      // 오름차 내림차
      // ASC -> 오름차
      // DESC -> 내림차
      order: {
        id: 'DESC',
      },
      // 처음 몇개를 제외할지
      skip: 0,
      // 몇개를 가져올지
      take: 1,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });

    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 's20604@naver.com',
      profile: {
        profileImg: 'test.png',
      },
    });

    // const profile = await this.profileRepository.save({
    //   user,
    //   profileImg: 'test.png',
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 's20604@navercom',
    });

    await this.postRepository.save({
      author: user,
      title: 'test',
    });

    await this.postRepository.save({
      author: user,
      title: 'test2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostTags() {
    const post1 = await this.postRepository.save({
      title: 'nestjs',
    });

    const post2 = await this.postRepository.save({
      title: 'pro',
    });

    const tag = await this.tagRepository.save({
      name: 'js',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'ts',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'nextjs',
      tags: [tag, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
