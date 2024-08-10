const { prisma } = require("../helpers/db")
const Joi = require("joi")

const create = async(req, res, next) => {
    try {
        const { title, categoryId, time } = req.body

        const schema = Joi.object({
            title: Joi.string().required(),
            categoryId: Joi.string().min(5).required(),
            time: Joi.string().required()
          });
      
          const { error } = schema.validate({ title, categoryId, time });
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newType = await prisma.type.create({data: {
            title,
            categoryId, 
            time
        }});

        res.status(201).json({message: "Success", data: newType});
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    try {
        const allType = await prisma.type.findMany();

        res.status(201).json({message: "Success", data: allType});
    } catch (error) {
        next(error)
    }
}

const change = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { title, categoryId, time } = req.body

        const findId = await prisma.type.findFirst({where: {id}});

        if(!findId)
            return res.status(401).json({message: "This type not found!!!"})

         await prisma.type.update({where: {id}, data: {
            title,
            categoryId,
            time
        }})

        res.status(203).json({message: "Successfully update!!!"});
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.type.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This type not found!!!"})

        await prisma.type.delete({where:{id}})

        res.status(205).json({message: "Successfully delete!!!"});
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