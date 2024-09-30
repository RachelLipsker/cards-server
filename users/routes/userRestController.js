const express = require("express");
const { registerUser, getUser, getUsers, loginUser, updateUser, statusUser, deleteUser } = require("../models/userAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { validateRegistration, validateLogin, validateEdit } = require("../validation/userValidationService");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        let user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only admin can see all users");
        }
        let users = await getUsers();
        res.send(users);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only admin or the user can see his profile");
        }
        let user = await getUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});



router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const newUser = req.body;
        const { id } = req.params;
        const fullUserFromDb = await getUser(id);

        if (userInfo._id != fullUserFromDb._id) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the user can edit his details"
            );
        }

        const errorMessage = validateEdit(newUser);
        if (errorMessage !== "") {
            return handleError(res, 400, "Validation error: " + errorMessage);
        }

        let user = await updateUser(id, newUser);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});


router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (userInfo._id != id) {
            return handleError(
                res,
                403,
                "Authorization Error: Only the user can change his status"
            );
        }

        let user = await statusUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});


router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only admin or the user can delete the user");
        }

        let user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, 400, error.message);
    }
});

module.exports = router;