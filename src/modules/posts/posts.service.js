import Post from './posts.entity.js';
import {Service} from "../../utils/decorators.js";
import {UserService} from "../users/users.services.js";

export class PostsService {

    constructor() {
        this.userService = Service(UserService);
    }

    async create(body, author) {
        const post = await Post.create({
            ...body,
            author: author._id
        });
        const user = await this.userService.getUserById(author._id, ['posts']);
        user.posts = [...user.posts, post._id];
        user.save();
        return post;
    }

    async getAllPosts() {
        return await Post.find()
            .sort('-createdAt')
            .populate('author', ["name"])
            .exec();
    }

    async getPostsByAuthor(author) {
        return await this.userService.getUserById(author, ['posts']);
    }
}
