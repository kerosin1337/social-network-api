import express from "express";
import UsersController from "./modules/users/users.controller.js";
import validator from "./utils/validator.js";
import CreateUserDto from './modules/users/dto/create-user.dto.js';

const router = new express.Router();

router.post("/users", validator(CreateUserDto),
    (req, res) => UsersController.create(req, res))

export default router;
