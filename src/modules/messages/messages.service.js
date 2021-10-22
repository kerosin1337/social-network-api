import Message from './messages.entity.js';
import {Service} from "../../utils/decorators.js";
import {UserService} from "../users/users.services.js";
import DialogSchema from "./messages.entity.js";

export class MessagesService {

    constructor() {
        this.userService = Service(UserService);
    }

    // async create(body, user) {
    //     const dialog = await DialogSchema.create({
    //         users: [
    //             ...body.users,
    //             user._id
    //         ],
    //         messages: [
    //             ...body.messages,
    //         ]
    //     })
    //     return dialog;
    // }

    async addMessageById(user_id, request) {

        try {
            const dialog = await DialogSchema.findOne({
                users: {
                    $in: [
                        request.user._id,
                        user_id
                    ]
                },
                type: 'dialog'
            })
            const {fwd_messages} = request.body;
            if (fwd_messages) {
                fwd_messages.forEach((value, id) => {
                    fwd_messages[id] = dialog.messages.find((messages) => messages.id.toString() === value);
                })
            }
            dialog.messages.push(request.body);
            dialog.save();
            return dialog;
        } catch (err) {
            // console.log(err)
            const dialog = await DialogSchema.create({
                users: [
                    user_id,
                    request.user._id
                ],
                messages: [
                    request.body
                ]
            })
            return dialog;
        }
    }

    async deleteMessageById(id, body, user) {
        const dialog = await DialogSchema.findOne({
            users: {
                $in: [
                    user._id,
                    id
                ]
            },
            type: 'dialog'
        })
        if (body.force) {
            const deleteMessage = dialog.messages.find((message) => message._id.toString() === body.id && user._id.toString() === message.from_id.toString());
            const idx = dialog.messages.indexOf(deleteMessage);
            if (idx !== -1) {
                dialog.messages.splice(idx, 1)
            }
        } else {
            const deleteMessage = dialog.messages.find((message) => message._id.toString() === body.id)
            deleteMessage.is_visible = false;
        }
        dialog.save()
        return dialog
    }

    async getMessageById(id, user) {
        const dialog = await DialogSchema.findOne({
            users: {
                $in: [
                    user._id,
                    id
                ]
            },
            type: 'dialog'
        })
        return dialog;
    }

    async getDialogsByUser(req) {
        const dialogs = await DialogSchema.find({
            users: req.user._id
        }).populate('users', ['name']).exec();
        return dialogs;
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
