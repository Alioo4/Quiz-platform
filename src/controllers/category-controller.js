const { prisma } = require("../helpers/db")
const Joi = require("joi")

const create = async(req, res, next) => {
    try {
        const { title } = req.body

        const schema = Joi.object({
            title: Joi.string().min(5).required(),
          });
      
          const { error } = schema.validate({ title });
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newCateg = await prisma.category.create({data: {
            title,
        }});

        res.status(201).json({message: "Success", data: newCateg});
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    try {
        const allCateg = await prisma.category.findMany();

        res.status(201).json({message: "Success", data: allCateg});
    } catch (error) {
        next(error)
    }
}

const change = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { title } = req.body

        const findId = await prisma.category.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This category not found!!!"})

         await prisma.category.update({where: {id}, data: {
            title
        }})

        res.status(201).json({message: "Successfully update!!!"});
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.category.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This category not found!!!"})

        await prisma.category.delete({where:{id}})

        res.status(201).json({message: "Successfully delete!!!"});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    getAll,
    change,
    remove
}