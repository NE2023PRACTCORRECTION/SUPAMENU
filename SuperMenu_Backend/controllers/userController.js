const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { validate } = require("../utils/userValidation");
const jwt = require("jsonwebtoken");


exports.createUser= async(req,res)=>{
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const { email, password ,fullnames,phone} = req.body;

    try{
        let user = await User.findOne({ where: { email } });
        if (user) {
          return res
            .status(400)
            .send(`The user with email ${email} already exists`);
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
    
        user = await User.create({
          email,
          password: hashedPassword,
          fullnames,
          phone
        });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

exports.loginUser = async (req, res, next) => {

    try {   
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).send("Incorrect email or password");
      }
  
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(404).send("Incorrect email or password");
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "3h"
      });
  
       res
         .status(200)
         .header("Authorization", `Bearer ${token}`)
         .json({
           success: true,
           token: `Bearer ${token}`
         });
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while logging in the user");
    }
  };

  exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
