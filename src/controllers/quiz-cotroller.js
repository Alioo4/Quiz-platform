const { prisma } = require("../helpers/db")
const Joi = require("joi")

const create = async(req, res, next) => {
    try {
        const { quiz, A, B, C, D, typeId } = req.body

        const schema = Joi.object({
            quiz: Joi.string().min(5).required(),
            A: Joi.string().required(),
            B: Joi.string().required(),
            C: Joi.string().required(),
            D: Joi.string().required(),
            typeId: Joi.string().min(5).required(),
          });
      
          const { error } = schema.validate({ quiz, A, B, C, D, typeId });
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newQuiz = await prisma.quiz.create({data: {
            quiz,
            A, 
            B, 
            C, 
            D, 
            typeId
        }});

        res.status(201).json({message: "Success", data: newQuiz});
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    try {
        const allQuiz = await prisma.quiz.findMany();

        res.status(201).json({message: "Success", data: allQuiz});
    } catch (error) {
        next(error)
    }
}

const change = async(req, res, next) => {
    try {
        const {id} = req.params;
        
        const { quiz, A, B, C, D, typeId } = req.body

        const findId = await prisma.quiz.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This quiz not found!!!"})

         await prisma.quiz.update({where: {id}, data: {
            quiz,
            A, 
            B, 
            C, 
            D, 
            typeId
        }});

        res.status(203).json({message: "Successfully update!!!"});
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.quiz.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This quiz not found!!!"})

        await prisma.quiz.delete({where:{id}})

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