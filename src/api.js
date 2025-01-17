import express from "express";
import UsersController from "./modules/users/users.controller.js";
import validator from "./utils/validator.js";
import CreateUserDto from './modules/users/dto/create-user.dto.js';
import LoginUserDto from './modules/users/dto/login-user.dto.js';
import CreatePostDto from './modules/posts/dto/create-post.dto.js';
import CreateDialogDto from './modules/messages/dto/create-dialog.dto.js';
import CreateMessageDto from './modules/messages/dto/create-message.dto.js';
import DeleteMessageDto from './modules/messages/dto/delete-message.dto.js';
import {auth} from "./utils/auth.js";
import PostsController from "./modules/posts/posts.controller.js";
import MessagesController from "./modules/messages/messages.controller.js";

const router = new express.Router();

router.post("/users", validator(CreateUserDto),
    (req, res) => UsersController.create(req, res))

router.post("/login", validator(LoginUserDto),
    (req, res) => UsersController.login(req, res))

router.get("/users", auth('jwt'),
    (req, res) => UsersController.getAuthUser(req, res))

router.get('/users/posts', auth('jwt'),
    (req, res) => PostsController.getMyPosts(req, res))

router.post("/posts", [auth('jwt'), validator(CreatePostDto)],
    (req, res) => PostsController.create(req, res));

router.get("/posts", auth('jwt'),
    (req, res) => PostsController.getAllPosts(req, res));
// router.post("/dialog", [auth('jwt'), validator(CreateDialogDto)],
//     (req, res) => MessagesController.create(req, res));
router.get("/message/:id", auth('jwt'),
    (req, res) => MessagesController.getMessage(req, res));
router.post("/message/:id", [auth('jwt'), validator(CreateMessageDto)],
    (req, res) => MessagesController.addMessage(req, res));
router.get("/dialogs", auth('jwt'),
    (req, res) => MessagesController.getDialogs(req, res));
router.delete("/dialog/:id", [auth('jwt'), validator(DeleteMessageDto)],
    (req, res) => MessagesController.deleteDialogs(req, res));
export default router;
