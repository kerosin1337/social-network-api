import {Controller, Service} from "../../utils/decorators.js";
import {AuthService, UserService} from "./users.services.js";
import {generateJwtToken} from "../../utils/auth.js";
import {HttpError} from "../../utils/errors.js";

class UsersController{

    constructor() {
        this.userService = Service(UserService);
        this.authService = Service(AuthService);
    }

    async create(req, res){
        try{
            const user = await this.userService.createUser(req.body);
            const {password, ...sUser} = user.toJSON();
            return res.status(201).json({
                message: "User created successfully",
                body: {
                    ...sUser,
                    accessToken: generateJwtToken(sUser)
                }
            })
        } catch (error){
            if(error instanceof HttpError && error.getCode() === 422){
                return res.status(422).json({
                    message: "Unprocessable entity",
                    error: error.getMessage()
                })
            }
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    async login(req, res) {
        try{
            const payload = await this.authService.login(req.body);
            return res.status(200).json({
                message: "User is authenticated",
                body: {
                    ...payload
                }
            })
        } catch (error){
            if(error instanceof HttpError){
                return res.status(error.getCode()).json({
                    message: error.getName(),
                    error: error.getMessage()
                })
            }
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    async getAuthUser(req, res){
        return res.status(200).json(req.user)
    }
}

export default Controller(UsersController);
