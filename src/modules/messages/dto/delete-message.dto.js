import Joi from "joi";

const schema = Joi.object({
    id: Joi.string(),
    force: Joi.bool().default(false)
})

export default schema;
