import Joi from "joi";

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    points: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        rate: Joi.number().required().min(0).max(5),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    })).required()
})

export default schema;
