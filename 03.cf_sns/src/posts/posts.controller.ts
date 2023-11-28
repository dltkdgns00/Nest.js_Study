import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '멤버들 때문에 버거운 민지',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 하니',
    content: '한국어 공부하는 하니',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'newjeans_official',
    title: '뉴진스 다니엘',
    content: '당근 먹고 있는 다니엘',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 4,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '이상한 해린',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 5,
    author: 'newjeans_official',
    title: '뉴진스 혜인',
    content: '장난 치고 있는 혜인',
    likeCount: 10000000,
    commentCount: 999999,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 다 가져온다.
  @Get()
  getPosts() {
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다.
  //    예를 들어서 id=1일 경우 id가 1인 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  //    새로운 post를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  // 4) PATCH /posts/:id
  //    id에 해당하는 post를 수정한다.
  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));

    return post;
  }

  // 5) DELETE /posts/:id
  //    id에 해당하는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +id);

    return id;
  }
}
