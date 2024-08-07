const Joi = require("joi");
const bcrypt = require("bcrypt");

const { createToken } = require("../helpers/jwt");
const { prisma } = require("../helpers/db");

const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const schema = Joi.object({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
      });
  
      const { error } = schema.validate({ email, password });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const existingUser = await prisma.users.findUnique({ where: { email } });
      if (!existingUser) {
        return res.status(401).json({ message: "Email or password incorrect!!!" });
      }
  
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Email or password incorrect!!!" });
      }
  
      const token = createToken({ id: existingUser.id, isAdmin: existingUser.isAdmin });
  
      res.json({ message: "Admin login successful!!!", token });
    } catch (error) {
      next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const allUsers = await prisma.users.findMany();

        res.json({message: "Success!", data: allUsers})
    } catch (error) {
        next(error)
    }
} 

const changeUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { fullname, username, password, email } = req.body;

        const schema = Joi.object({
            fullname: Joi.string().min(5).required(),
            username: Joi.string().min(5).required(),
            password: Joi.string().min(5).required(),
            email: Joi.string().min(5).required(),
        });

        const findId = await prisma.users.findFirst({where: {id}});

        if(!findId)
            return res.status(400).json({message: "This user not found!!!"});
    
        const { error } = schema.validate({ fullname, username, password, email });
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.users.update({where: {id}, data: {fullname, username, password: hashedPassword, email}})
    } catch (error) {
        next(error)
    }
} 
  
module.exports = {
    login,
    changeUser,
    getUsers
};