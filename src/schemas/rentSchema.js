import joi from 'joi'

const rentSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(0).invalid(0).required()
})

export default rentSchema
