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
}

export default Controller(MessagesController);
