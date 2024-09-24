const express = require("express");

const cardsRouterController = require("../cards/routes/cardsRestConroller");
const usersRouterController = require("../users/routes/userRestController");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.use("/cards", cardsRouterController);
router.use("/users", usersRouterController);

router.use((req, res) => {
    handleError(res, 404, "path not found");
})

module.exports = router;