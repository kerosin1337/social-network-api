import Message from './messages.entity.js';
import {Service} from "../../utils/decorators.js";
import {UserService} from "../users/users.services.js";
import DialogSchema from "./messages.entity.js";

export class MessagesService {

    constructor() {
        this.userService = Service(UserService);
    }

    async create(body, user) {
        const dialog = await DialogSchema.create({
            users: [
                ...body.users,
                {user_id: user._id}
            ],
            messages: [
                ...body.messages,
            ]
        })
        return dialog;
    }

    async addMessageById(id, body) {
        const dialog = await DialogSchema.findById(id);
        dialog.messages.push(body);
        dialog.save();
        return dialog;
    }

    async getMessageById(id) {
        const message = await DialogSchema.findById(id);
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
