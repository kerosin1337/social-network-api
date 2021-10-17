import User from './users.entity.js';
import {HttpError} from "../../utils/errors.js";
import {generateJwtToken} from "../../utils/auth.js";

export class UserService{
    async createUser(body){
        if(await User.findOne({ email: body.email }).countDocuments())
            throw new HttpError({
                email: {
                    type: "email.unique",
                    message: '"email" must be unique'
                }
            }, 422);
        const user = new User(body);
        await user.save();
        return user;
    }

    async getUserById(id, relations = []){
        const query = User.findById(id);
        relations.forEach(rel => query.populate(rel))
        return query;
    }
}

export class AuthService{
    async login(body){
        const user = await User.findOne({ email: body.email }).exec();
        if(user && user.validatePassword(body.password)){
            return {
                ...user.toJSON(),
                accessToken: generateJwtToken(user.toJSON())
            }
        } else {
            throw new HttpError({
                message: "Incorrect email or password"
            }, 404, "User not found");
        }
    }
}
