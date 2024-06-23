const Joi= require('joi')

function validateMenu(user){
    const userSchema=Joi.object({
        fullnames:Joi.string().required().max(30),
        phone:Joi.string().required().max(15),
        email:Joi.string().required().email(),
        password:Joi.required()
    });
    return userSchema.validate(user)
}

module.exports.validate = validateUser;