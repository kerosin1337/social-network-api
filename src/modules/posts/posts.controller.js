import {Controller, Service} from "../../utils/decorators.js";
import {PostsService} from "./posts.service.js";

class PostsController {

    constructor() {
        this.postsService = Service(PostsService);
    }

    async create(req, res){
        try{
            const post = await this.postsService.create(req.body, req.user);
            return res.status(201).json({
                message: "Post create successfully",
                body: post.toJSON()
            })
        } catch (error){
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    async getMyPosts(req, res){
        const posts = await this.postsService.getPostsByAuthor(req.basicUser);
        return res.status(200).json(posts)
    }

    async getAllPosts(req, res){
        const posts = await this.postsService.getAllPosts();
        return res.status(200).json(posts)
    }
}

export default Controller(PostsController);
