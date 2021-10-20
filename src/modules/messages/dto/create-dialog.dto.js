import Joi from "joi";

const schema = Joi.object({
    users: Joi.array().items(Joi.object({
        user_id: Joi.string()
    })),
    messages: Joi.array().items(Joi.object({
        body: Joi.string().required(),
        read_state: Joi.number(),
        to_id: Joi.string().required(),
        from_id: Joi.string().required(),
        fwd_messages: Joi.array().items(Joi.object({
            user_id: Joi.string(),
            body: Joi.string().required(),
        })),
    })),
    type: Joi.string().valid('dialog', 'peers')

    // description: Joi.string().required(),
    // points: Joi.array().items(Joi.object({
    //     title: Joi.string().required(),
    //     rate: Joi.number().required().min(0).max(5),
    //     latitude: Joi.number().required(),
    //     longitude: Joi.number().required(),
    // })).required()
})

export default schema;
