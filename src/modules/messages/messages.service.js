import Message from './messages.entity.js';
import {Service} from "../../utils/decorators.js";
import {UserService} from "../users/users.services.js";

export class MessagesService {

    constructor() {
        this.userService = Service(UserService);
    }

    async create(body, user) {
        const message = await Message.create({
            ...body,
            from_id: user._id
        })
        return message;
    }

    // async create(body, author){
    //     const post = await Message.create({
    //         ...body,
    //         author: author._id
    //     });
    //     const user = await this.userService.getUserById(author._id, ['posts']);
    //     user.posts = [ ...user.posts, post._id];
    //     user.save();
    //     return post;
    // }
    //
    // async getAllPosts(){
    //     return await Post.find()
    //         .sort('-createdAt')
    //         .populate('author', [ "name" ])
    //         .exec();
    // }
    //
    // async getPostsByAuthor(author){
    //     return await this.userService.getUserById(author, ['posts']);
    // }
}
