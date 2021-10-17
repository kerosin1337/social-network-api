import Post from './posts.entity.js';

export class PostsService{
    async create(body, author){
        return await Post.create({
            ...body,
            author: author._id
        });
    }

    async getAllPosts(){
        return await Post.find().sort('-createdAt').exec();
    }

    async getPostsByAuthor(author){
        console.log(author)
        return [];
    }
}
