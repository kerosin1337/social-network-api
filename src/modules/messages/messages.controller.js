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
    }

    async getMessage(req, res) {
        const message = await this.messagesService.getMessageById(req.params.id);

        return res.json({
            body: message
        });
    }

    async addMessage(req, res) {
        const message = await this.messagesService.addMessageById(req.params.id, req.body);

        return res.json({
            body: message
        });
    }

    async getDialogs(req, res) {
        const dialogs = await this.messagesService.getDialogsByUser(req);
        return res.json({
            body: dialogs
        })
    }

    async deleteDialogs(req, res) {
        await this.messagesService.deleteMessageById(req.params.id, req.body, req.user)

        return res.json({
            massage: 'Deleted'
        })
    }
}

export default Controller(MessagesController);
