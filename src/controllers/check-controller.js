const { prisma } = require("../helpers/db")
const Joi = require("joi")

const create = async(req, res, next) => {
    try {
        const { solution, quizId } = req.body

        const schema = Joi.object({
            solution: Joi.string().min(5).required(),
            quizId: Joi.string().required(),
          });
      
          const { error } = schema.validate({ solution, quizId });
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newAnswer = await prisma.check.create({data: {
            solution,
            quizId
        }});

        res.status(201).json({message: "Success", data: newAnswer});
    } catch (error) {
        next(error)
    }
}

const getAll = async(req, res, next) => {
    try {
        const allAnswers = await prisma.check.findMany();

        res.status(201).json({message: "Success", data: allAnswers});
    } catch (error) {
        next(error)
    }
}

const change = async(req, res, next) => {
    try {
        const {id} = req.params;

        const { solution, quizId } = req.body

        const findId = await prisma.check.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This Answer not found!!!"})

         await prisma.check.update({where: {id}, data: {
            solution,
            quizId
        }})

        res.status(203).json({message: "Successfully update!!!"});
    } catch (error) {
        next(error)
    }
}

const remove = async(req, res, next) => {
    try {
        const { id } = req.params

        const findId = await prisma.check.findFirst({where: {id}})

        if(!findId)
            return res.status(401).json({message: "This Answer not found!!!"})

        await prisma.check.delete({where:{id}})

        res.status(205).json({message: "Successfully delete!!!"});
    } catch (error) {
        next(error)
    }
}

const checking = async (req, res, next) => {
    try {
        const { solutions, quizId } = req.body;

        const findQuiz = await prisma.check.findMany({ where: { quizId } });

        if (!findQuiz.length) {
            return res.status(404).json({ message: "Quiz not found!" });
        }

        const correctSolution = findQuiz[0].solution; // Assuming quizId maps to one answer
        let count = 0;
        let arr = [];

        for (let i = 0; i < correctSolution.length; i++) {
            if (solutions[i] === correctSolution[i]) {
                count++;
                arr.push(true);
            } else {
                arr.push(false);
            }
        }

        const userId = req.user.id; // Ensure `req.user.id` is correctly set and validated

        await prisma.users.update({
            where: { id: userId },
            data: {
                ball: { increment: count } // Increment the score
            }
        });

        res.status(200).json({ message: "Successfully checked", data: arr });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    getAll,
    change,
    remove,
    checking
}