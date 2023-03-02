import joi from 'joi'

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().min(0).invalid(0).required(),
    pricePerDay: joi.number().min(0).invalid(0).required()
})

export default gameSchema

