const { user } = require("../controllers");

// const { ROUTES } = require("../services/constant");

const router = require("express").Router();

router.route('/registration').post(user.createUser);
router.route('/login').post(user.login);



// router.route(ROUTES.GENERATE_DESCRIPTION_AI).post(commonController.generateDescription)
// router.route(ROUTES.FETCH_CATEGORY).get(commonController.fetchCategories)
// router.route(ROUTES.FETCH_TRANDING_SEARCHES).get(commonController.fetchTrendingSearches)
// router.route(ROUTES.FETCH_MCQ).get(commonController.fetchMcqs)
// router.route(ROUTES.GENERATE_DESCRIPTION_AI).post(commonController.generateDescription)
// router.route(ROUTES.GUEST_LOGIN).post(commonController.guestLogin)

module.exports = router;