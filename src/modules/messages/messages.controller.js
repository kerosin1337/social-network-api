import {Controller, Service} from "../../utils/decorators.js";
import {MessagesService} from "./messages.service.js";

class MessagesController {

    constructor() {
        this.messagesService = Service(MessagesService);
    }

    async create(req, res) {
        const message = await this.messagesService.create(req.body, req.user);
        return res.status(201).json({
            body: message.toJSON()
        })
        // return res.status(201).json({
        //     body: messages
        // })
        // const messages = await this.messagesService.create(req.body, req.user);
        // try{
        //     const post = await this.postsService.create(req.body, req.user);
        //     return res.status(201).json({
        //         message: "Post create successfully",
        //         body: post.toJSON()
        //     })
        // } catch (error){
        //     return res.status(500).json({
        //         message: "Internal Server Error",
        //         error: error.message
        //     })
        // }
    }

    //
    // async getMyPosts(req, res){
    //     const {posts} = await this.postsService.getPostsByAuthor(req.user._id);
    //     return res.status(200).json(posts)
    // }
    //
    // async getAllPosts(req, res){
    //     const posts = await this.postsService.getAllPosts();
    //     return res.status(200).json(posts)
    // }
}

export default Controller(MessagesController);
