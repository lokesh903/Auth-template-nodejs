const { comparisions } = require("../controllers");
const { validateUser } = require("../middleware/auth");

// const { ROUTES } = require("../services/constant");

const router = require("express").Router();

router.route('/get-comps').post(validateUser, comparisions.saveContact);
router.route('/test').get(validateUser, comparisions.testApi)
// router.route(ROUTES.GENERATE_DESCRIPTION_AI).post(commonController.generateDescription)
// router.route(ROUTES.FETCH_CATEGORY).get(commonController.fetchCategories)
// router.route(ROUTES.FETCH_TRANDING_SEARCHES).get(commonController.fetchTrendingSearches)
// router.route(ROUTES.FETCH_MCQ).get(commonController.fetchMcqs)
// router.route(ROUTES.GENERATE_DESCRIPTION_AI).post(commonController.generateDescription)
// router.route(ROUTES.GUEST_LOGIN).post(commonController.guestLogin)

module.exports = router;