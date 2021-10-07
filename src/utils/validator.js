const configs = {
    abortEarly: false,
    errors: {
        escapeHtml: true
    }
}

const JoiMessageParser = (errors, fields = ['type', 'message']) =>
    errors.details.map(error => {
        return {
            [error.context.label]: fields.reduce((current, key) => {
                return {...current, [key]: error[key] || null}
            }, {})
        }
    }).reduce((current, item) => ({ ...current, ...item }), {})

export default function (schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, configs);
        if (!error) return next();
        return res.status(422).json({ message: "Unprocessable entity", error: JoiMessageParser(error) })
    }
}
