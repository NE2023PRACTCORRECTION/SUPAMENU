const Joi= require('joi')
const password_complexity = require('joi-password-complexity')

function validateUser(user){
    const userSchema=Joi.object({
        fullnames:Joi.string().required().max(30),
        phone:Joi.string().required().max(15),
        email:Joi.string().required().email(),
        password:Joi.required()
    });
    return userSchema.validate(user)
}

module.exports.validate = validateUser;