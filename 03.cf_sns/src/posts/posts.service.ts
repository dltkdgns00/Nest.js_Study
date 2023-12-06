import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

// export interface PostModel {
//   id: number;
//   author: string;
//   title: string;
//   content: string;
//   likeCount: number;
//   commentCount: number;
// }

// let posts: PostModel[] = [
//   {
//     id: 1,
//     author: 'newjeans_official',
//     title: '뉴진스 민지',
//     content: '멤버들 때문에 버거운 민지',
//     likeCount: 10000000,
//     commentCount: 999999,
//   },
//   {
//     id: 2,
//     author: 'newjeans_official',
//     title: '뉴진스 하니',
//     content: '한국어 공부하는 하니',
//     likeCount: 10000000,
//     commentCount: 999999,
//   },
//   {
//     id: 3,
//     author: 'newjeans_official',
//     title: '뉴진스 다니엘',
//     content: '당근 먹고 있는 다니엘',
//     likeCount: 10000000,
//     commentCount: 999999,
//   },
//   {
//     id: 4,
//     author: 'newjeans_official',
//     title: '뉴진스 해린',
//     content: '이상한 해린',
//     likeCount: 10000000,
//     commentCount: 999999,
//   },
//   {
//     id: 5,
//     author: 'newjeans_official',
//     title: '뉴진스 혜인',
//     content: '장난 치고 있는 혜인',
//     likeCount: 10000000,
//     commentCount: 999999,
//   },
// ];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, title?: string, content?: string) {
    // save의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
