const { prisma } = require("../helpers/db")
const Joi = require("joi")

const create = async(req, res, next) => {
    try {
        const { quizTitle, userId, description } = req.body

        const schema = Joi.object({
            quizTitle: Joi.string().min(5).required(),
            userId: Joi.string().required(),
            description: Joi.string().min(5).required(),
          });
      
          const { error } = schema.validate({ quizTitle, userId, description });
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newType = await prisma.commet.create({data: {
            quizTitle,
            userId,
            description
        }});

        res.status(201).json({message: "Success", data: newType});
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    try {
        const allComment = await prisma.commet.findMany();

        res.status(201).json({message: "Success", data: allComment});
    } catch (error) {
        next(error)
    }
}

const change = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { quizTitle, userId, description } = req.body

        const findId = await prisma.commet.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This comment not found!!!"})

         await prisma.commet.update({where: {id}, data: {
            quizTitle,
            userId,
            description
        }})

        res.status(203).json({message: "Successfully update!!!"});
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.commet.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This comment not found!!!"})

        await prisma.commet.delete({where:{id}})

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