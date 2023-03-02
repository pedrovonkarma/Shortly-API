import urlSchema from "../schemas/urlSchema.js"
export async function validateSchema(req, res, next){
    if(!req.body){
        return res.sendStatus(422)
    }
    const validation = urlSchema.validate(req.body)
    if (validation.error) {
        return res.status(422).send(validation.error.details)
    }
    next()
}