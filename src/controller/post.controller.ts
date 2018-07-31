import { Controller, Query, Mutation } from 'vesper';
import { EntityManager, FindManyOptions } from 'typeorm';
import { PostsArgs } from '../args/post.args';
import { Post } from '../entity/post.entity';

@Controller()
export class PostController {
  constructor(private entityManager: EntityManager) {}

  // serves "posts: [Post]" requests
  @Query()
  posts(args: PostsArgs) {
    let findOptions: FindManyOptions = {};
    if (args.limit) findOptions.take = args.limit;
    if (args.offset) findOptions.skip = args.offset;
    if (args.sortBy === 'last') findOptions.order = { id: 'DESC' };
    if (args.sortBy === 'name') findOptions.order = { name: 'ASC' };

    return this.entityManager.find(Post, findOptions);
  }

  // serves "post(id: Int): Post" requests
  @Query()
  post({ id }) {
    return this.entityManager.findOne(Post, id);
  }

  // serves "postSave(id: Int, title: String, text: String): Post" requests
  @Mutation()
  postSave(args) {
    const post = this.entityManager.create(Post, args);
    return this.entityManager.save(Post, post);
  }

  // serves "postDelete(id: Int): Boolean" requests
  @Mutation()
  async postDelete({ id }) {
    await this.entityManager.remove(Post, { id: id });
    return true;
  }
}
