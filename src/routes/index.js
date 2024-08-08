const authRoute = require('../routes/auth-route');
const adminRoute = require('../routes/admin-route');
const categoryRoute = require('../routes/category-route');
const typeRoute = require('../routes/type-route');
const quizRoute = require('../routes/quiz-route');
const commentRoute = require('../routes/comment-route');

module.exports = [authRoute, adminRoute, categoryRoute, typeRoute, quizRoute, commentRoute];