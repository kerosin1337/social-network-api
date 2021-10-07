import {Controller, Service} from "../../utils/decorators.js";
import {UserService} from "./users.services.js";

class UsersController{

    constructor() {
        this.userService = Service(UserService);
    }

    async create(req, res){
        try{
            this.userService.createUser(req.body);
            return res.status(201).json({
                message: "User created successfully",
                body: {}
            })
        } catch (error){
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}

export default Controller(UsersController);
